"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addCardsServer } from "@/actions/action";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(15, {
      message: "Card number must be at least 16 characters.",
    })
    .max(19, {
      message: "Card number can not be more than 19 characters.",
    })
    .regex(/^\d+$/, {
      message: "Card number must contain only difgits",
    }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry Date must me in MM/YY format",
  }),
  cvv: z.coerce
    .number()
    .min(100, { message: "CVV Must be atleast 3 digits" })
    .max(9999, { message: "CVV can not exceed 4 digits" }),
});

export function AddCards() {
  const [sampleExpiryMonth, setSampleExpiryMonth] = useState("");
  const [sampleExpiryYear, setSampleExpiryYear] = useState("");

  useEffect(() => {
    const { sampleMonthOfExpiry, sampleYearOfExpiry } = getSampleExpiryDate();
    setSampleExpiryMonth(sampleMonthOfExpiry);
    setSampleExpiryYear(sampleYearOfExpiry);
  }, []);

  const user = useUser();
  const router = useRouter();

  const getSampleExpiryDate = () => {
    const todaysDate = Date.now();
    const sampleExpiryDate: string = new Date(todaysDate)
      .toISOString()
      .split("T")[0];
    console.log(sampleExpiryDate);
    const sampleMonthOfExpiry = sampleExpiryDate.split("-")[1];
    const sampleYearOfExpiry = sampleExpiryDate.split("-")[0].slice(2);
    return { sampleMonthOfExpiry, sampleYearOfExpiry };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user?.user) {
      addCardsServer(
        values.cardNumber,
        values.expiryDate,
        values.cvv,
        user?.user?.id
      );
    }

    toast.success("Card Details Added Successfully!");
    form.reset();
    router.refresh();
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-center text-primary">
          Add New Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="4242424242424242" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={sampleExpiryMonth + "/" + sampleExpiryYear}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="CVV" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add Card
              <CirclePlus />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
