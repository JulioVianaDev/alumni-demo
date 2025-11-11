// Mock user database
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  isMember: boolean;
  avatar?: string;
  graduationYear?: string;
  course?: string;
  company?: string;
  position?: string;
}

// Mock users for login
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@alumni.pt',
    password: '123456',
    phone: '+351 912 345 678',
    isMember: true,
    graduationYear: '2015',
    course: 'Engenharia Informática',
    company: 'TechCorp Portugal',
    position: 'Senior Software Engineer',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@alumni.pt',
    password: '123456',
    phone: '+351 913 456 789',
    isMember: true,
    graduationYear: '2012',
    course: 'Marketing',
    company: 'Marketing Solutions Lda',
    position: 'Marketing Director',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@alumni.pt',
    password: '123456',
    phone: '+351 914 567 890',
    isMember: false,
    graduationYear: '2018',
    course: 'Gestão',
    company: 'Startup XYZ',
    position: 'Fundador',
  },
];

// Mock authentication functions
export const mockLogin = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  
  return null;
};

export const mockRegister = (userData: Partial<User>): User => {
  const newUser: User = {
    id: Date.now().toString(),
    name: userData.name || '',
    email: userData.email || '',
    password: userData.password || '',
    phone: userData.phone,
    isMember: false,
    graduationYear: userData.graduationYear,
    course: userData.course,
    company: userData.company,
    position: userData.position,
  };
  
  mockUsers.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword as User;
};

// Mock API delay
export const mockApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

