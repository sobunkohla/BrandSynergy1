'use client'

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { use, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"   
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { MarketSpace } from "@prisma/client";
import { cn } from "@/lib/utils";

const investmentOptions = [
  { value : "Under $1,000"},
  { value : "$1,000 - $5,000"},
  { value : "$5,001 - $10,000"},
  { value : "$10,001 - $20,000"},
  { value : "$20,001 - $50,000"},
  { value : "$50,001 - $100,000"},
  { value : "$100,001 - $500,000"},
  { value : "$500,001 - $1,000,000"},
  { value : "Over $1,000,000"},
  { value : "Undecided"},
];

interface InvestmentProps {
    initialData: MarketSpace;
marketspaceId: string;
}

const formSchema = z.object({
  investment: z.string({
    required_error: "Please select an investment.",
  }),
})


export const InvestmentForm = ({
    initialData,
    marketspaceId
  }: InvestmentProps) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEdit = () => setIsEditing((current) => !current);
  
    const router = useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        investment: initialData?.investment || ""
      },
    });

const { isSubmitting , isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/marketspaces/${marketspaceId}`, values)
       toast.success("Market Space updated successfully");
       toggleEdit()
       router.refresh();
    } catch  {
      toast.error('something went wrong')
    }

   
  };
  return (
    <div className="mt-6 border bg-orange-100 rounded-md p-4 ">
     <div className="font-medium flex items-center justify-between">
       investment
       <Button onClick={toggleEdit} variant='ghost'>
        {isEditing ? (
            <>cancel</>
        ):(
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit investment
        </>
        )}
        
       </Button>
     </div>
     {!isEditing ? (
          <p className={cn(
            "text-sm mt-2",
            !initialData.investment && "text-slate-500 italic"
          )}>
            {initialData.investment || "no investment "}
          </p>
     ) : (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
            >
                <FormField 
                control={form.control}
                name="investment"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Language</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? investmentOptions.find(
                                  (investment) => investment.value === field.value
                                )?.value
                              : "Select investment"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search investment..." />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {investmentOptions.map((investment) => (
                              <CommandItem
                                value={investment.value}
                                key={investment.value}
                                onSelect={() => {
                                  form.setValue("investment", investment.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    investment.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {investment.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      this is the amount you are willing to invest into the business.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}

             />
             <div className="flex items-center gap-x-2 ">
                <Button 
                disabled={!isValid || isSubmitting} 
                type="submit"
                >
                    save
                </Button>
             </div>
        
            </form>
        </Form>
     )}
    </div>
  )
}