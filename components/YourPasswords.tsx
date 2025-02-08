"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deletePasswordServer } from "@/actions/action";

interface PasswordsProps {
  website: string;
  username: string;
  password: string;
}

export function YourPasswords({ passwords }: { passwords: PasswordsProps[] }) {
  const user = useUser();
  const router = useRouter();

  // const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState<{
    [key: number]: boolean;
  }>({});
  const togglePasswordVisibility = (index: number) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = async (website: string) => {
    if (!user?.user) return;
    await deletePasswordServer(website, user.user.id);
    toast.success("Card deleted successfully!");
    router.refresh(); // Refresh UI to update the table
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">Saved Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Website</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passwords.map((password, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link
                    href={
                      password.website.startsWith("http")
                        ? password.website
                        : `https://${password.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {password.website}
                  </Link>
                </TableCell>
                <TableCell>{password.username}</TableCell>
                <TableCell>
                  {visiblePassword[index] ? (
                    <span>{password.password}</span>
                  ) : (
                    "••••••••"
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePasswordVisibility(index)}
                  >
                    {visiblePassword[index] ? (
                      <EyeClosed className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(password.website)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
