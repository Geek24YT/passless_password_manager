"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addPasswordServer } from "@/actions/action";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  website: z.string().min(2, {
    message: "Add at least 2 chars",
  }),
  username: z.string().min(2, {
    message: "Add at least 2 chars",
  }),
  password: z.string().min(2, {
    message: "Add at least 2 chars",
  }),
});

export function AddPassword() {
  const [passwordType, setPasswordType] = useState(true);
  const user = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user?.user) {
      console.log("inside the if");
      addPasswordServer(
        values.website,
        values.username,
        values.password,
        user?.user?.id
      );
    }
    toast.success("Password Added Successfully!");
    form.reset();
    router.refresh();
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-center text-primary">
          Add New Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Wesbite</FormLabel>
                  <FormControl>
                    <Input placeholder="www.geek24.in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Geek24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type={passwordType ? "password" : "text"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-0 flex justify-center cursor-pointer">
              {passwordType === false ? (
                <Eye
                  onClick={(e) => {
                    setPasswordType(!passwordType);
                  }}
                />
              ) : (
                <EyeOff
                  onClick={(e) => {
                    setPasswordType(!passwordType);
                  }}
                />
              )}
            </div>

            <Button type="submit" className="w-full">
              Add Password
              <CirclePlus />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
