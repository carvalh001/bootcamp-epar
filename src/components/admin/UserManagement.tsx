import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import UserForm from './user/UserForm';
import UsersTable from './user/UsersTable';
import EmptyUsersList from './user/EmptyUsersList';

interface AdminUser {
  id: string;
  username: string;
  password: string;
  isActive: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*');
          
        if (error) {
          console.error('Error fetching users:', error);
          toast({
            title: "Erro ao carregar usuários",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        const formattedUsers: AdminUser[] = data.map(user => ({
          id: user.id,
          username: user.username,
          password: user.password,
          isActive: user.is_active
        }));
        
        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error processing users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o nome de usuário e a senha",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data: existingUsers, error: checkError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', newUser.username);
        
      if (checkError) {
        toast({
          title: "Erro ao verificar usuário",
          description: checkError.message,
          variant: "destructive"
        });
        return;
      }
      
      if (existingUsers && existingUsers.length > 0) {
        toast({
          title: "Usuário já existe",
          description: "Este nome de usuário já está em uso",
          variant: "destructive"
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          username: newUser.username,
          password: newUser.password,
          is_active: true
        })
        .select();
        
      if (error) {
        toast({
          title: "Erro ao adicionar usuário",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      if (data && data.length > 0) {
        const newUserData: AdminUser = {
          id: data[0].id,
          username: data[0].username,
          password: data[0].password,
          isActive: data[0].is_active
        };
        
        setUsers([...users, newUserData]);
        setNewUser({ username: '', password: '' });
        setIsAdding(false);
        
        toast({
          title: "Usuário adicionado",
          description: "O novo usuário foi adicionado com sucesso"
        });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Erro ao adicionar usuário",
        description: "Ocorreu um erro inesperado",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteUser = async (id: string) => {
    if (users.length <= 1) {
      toast({
        title: "Operação não permitida",
        description: "Você não pode remover o único usuário administrador",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);
        
      if (error) {
        toast({
          title: "Erro ao remover usuário",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      setUsers(users.filter(user => user.id !== id));
      
      toast({
        title: "Usuário removido",
        description: "O usuário foi removido com sucesso"
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erro ao remover usuário",
        description: "Ocorreu um erro inesperado",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-realestate-primary"></div>
      </div>
    );
  }
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Gerenciamento de Usuários</CardTitle>
            <CardDescription>
              Gerencie o acesso de administradores ao painel
            </CardDescription>
          </div>
          <Button onClick={() => {
            setIsAdding(!isAdding);
            setNewUser({ username: '', password: '' });
          }}>
            {isAdding ? 'Cancelar' : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Usuário
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAdding ? (
          <UserForm
            username={newUser.username}
            password={newUser.password}
            onUsernameChange={(value) => setNewUser({ ...newUser, username: value })}
            onPasswordChange={(value) => setNewUser({ ...newUser, password: value })}
            onSubmit={handleAddUser}
          />
        ) : (
          <div className="space-y-4">
            {users.length > 0 ? (
              <UsersTable users={users} onDeleteUser={handleDeleteUser} />
            ) : (
              <EmptyUsersList />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
