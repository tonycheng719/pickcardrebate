"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Shield, Ban, CheckCircle, CreditCard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  status: "active" | "suspended";
  joinDate: string;
  lastIp?: string;
  cardCount?: number;
}

interface UserTableProps {
  initialUsers: AdminUser[];
}

export function UserTable({ initialUsers }: UserTableProps) {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => 
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">會員管理</h1>
          <p className="text-gray-500 dark:text-gray-400">
            管理 {users.length} 位註冊用戶的權限與狀態。
          </p>
        </div>
        <Button variant="outline">匯出 CSV</Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="搜尋姓名或 Email..." 
            className="pl-9 dark:bg-gray-700 dark:border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">用戶</th>
              <th className="px-6 py-4 font-medium">角色</th>
              <th className="px-6 py-4 font-medium">持有卡數</th>
              <th className="px-6 py-4 font-medium">狀態</th>
              <th className="px-6 py-4 font-medium">最後 IP</th>
              <th className="px-6 py-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {filteredUsers.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        沒有找到相符的會員。
                    </td>
                </tr>
            ) : (
                filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                    </td>
                    <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                        {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                        {user.role === 'admin' ? '管理員' : '一般會員'}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                    {user.cardCount !== undefined && user.cardCount > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        <CreditCard className="w-3 h-3" />
                        {user.cardCount} 張
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">未加入</span>
                    )}
                    </td>
                    <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${
                        user.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                        <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {user.status === 'active' ? '正常' : '已封鎖'}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">
                    {user.lastIp || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                        <DropdownMenuLabel className="dark:text-gray-300">帳號操作</DropdownMenuLabel>
                        <DropdownMenuSeparator className="dark:bg-gray-700" />
                        <DropdownMenuItem
                            className="cursor-pointer dark:text-gray-300 dark:focus:bg-gray-700"
                            onClick={() => router.push(`/admin/users/${user.id}`)}
                        >
                            查看詳情
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className={`cursor-pointer ${user.status === 'active' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'} dark:focus:bg-gray-700`}
                            onClick={() => toggleStatus(user.id)}
                        >
                            {user.status === 'active' ? (
                                <><Ban className="w-4 h-4 mr-2" /> 封鎖帳號</>
                            ) : (
                                <><CheckCircle className="w-4 h-4 mr-2" /> 解除封鎖</>
                            )}
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



