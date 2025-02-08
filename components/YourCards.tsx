"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { deleteCardServer } from "@/actions/action";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

interface CardProps {
  cardNo: string;
  expiry: string;
  cvv: string;
}

export function YourCards({ cards }: { cards: CardProps[] }) {
  const user = useUser();
  const router = useRouter();

  const handleDelete = async (cardNo: string) => {
    if (!user?.user) return;
    await deleteCardServer(cardNo, user.user.id);
    toast.success("Card deleted successfully!");
    router.refresh(); // Refresh UI to update the table
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">Saved Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Card Number</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>CVV</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card, index) => (
              <TableRow key={index}>
                <TableCell>{card.cardNo}</TableCell>
                <TableCell>{card.expiry}</TableCell>
                <TableCell>{card.cvv}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(card.cardNo)}
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
