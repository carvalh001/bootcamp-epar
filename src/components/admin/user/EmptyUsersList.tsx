
import React from 'react';
import { Users } from 'lucide-react';

const EmptyUsersList = () => {
  return (
    <div className="text-center py-6 text-gray-500">
      <Users className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum usuário</h3>
      <p className="mt-1 text-sm text-gray-500">
        Comece adicionando seu primeiro usuário administrador.
      </p>
    </div>
  );
};

export default EmptyUsersList;
