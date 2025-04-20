
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

interface UserFormProps {
  username: string;
  password: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

const UserForm = ({ 
  username, 
  password, 
  onUsernameChange, 
  onPasswordChange, 
  onSubmit 
}: UserFormProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <div className="space-y-2">
        <Label htmlFor="new-username">Nome de Usuário</Label>
        <Input
          id="new-username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Digite o nome de usuário"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">Senha</Label>
        <Input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Digite a senha"
        />
      </div>
      <Button onClick={onSubmit} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Salvar Usuário
      </Button>
    </div>
  );
};

export default UserForm;
