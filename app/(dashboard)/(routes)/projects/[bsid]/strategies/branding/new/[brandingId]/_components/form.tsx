"use client";

import { Loader } from "lucide-react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { BrandingStrategy, MarketSpace } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ChatCompletionRequestMessage } from "openai";
import StrategyCard from "@/components/custom/strategy-card";
import { title } from "process";

const predefinedStrategyTypes = [
    { value: " Define  Brand Identity" },
    { value: "Identify  Target Audience" },
    { value: "Unique Selling Proposition (USP)" },
    { value: "  Services and Pricing" },
    { value: "Online Presence" },
    { value: "Content Marketing" },
    { value: "Social Proof" },
    { value: "Local SEO" },
    { value: " Customer Experience" },
    { value: "Marketing Campaigns" },
    { value: " Consistent Branding" },
  ];

interface Props {
    marketSpace: MarketSpace;
    userId: string;
    brandingStrategy: BrandingStrategy;
}

export default function FormPage({
    
marketSpace, userId, brandingStrategy
}: Props) {

    // define variables 
    const [description, setDescription] = useState( '');
    const [strategyType, setStrategyType] = useState('');
    const [strategyName, setStrategyName] = useState('');
    const [editing, setEditing] = useState(false);
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const router = useRouter();

  //implement logic
function toggleEdit () {
  setEditing(prev => !prev);
}

    const formSchema = z.object({
        strategyType: z.string({
          required_error: "Please select a type",
        }),
        strategyPurpose: z.string().min(1, {
          message: "Purpose is required",
        }),
        title: z.string().min(1, {
          message: "Purpose is required",
        }),
      });
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          strategyType: brandingStrategy?.type || '',
          strategyPurpose: brandingStrategy?.description || '',
           title: brandingStrategy?.title || '',
        },
      });
    
      const isLoading = form.formState.isSubmitting;
    
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          toggleEdit()
            setDescription(values.strategyPurpose)
            setStrategyType(values.strategyType)
            setStrategyName(values.title)
          const userMessage: ChatCompletionRequestMessage = {
            role: "user",
            content: `You are a highly experienced branding strategist/expert, and you've been tasked with creating a comprehensive branding strategy and plan for a budding entrepreneur who is passionate but entirely new to the business world by doing the research for them and providing data relevant to only what you currently know. This individual has a business idea and some initial information, but they need your expertise to turn it into a well-thought-out and rigid brand; you are essentially creating the brand for them.

            **Business Overview:**
            - The name of the business is ${marketSpace.businessName}.
            - The business is located in ${marketSpace.location}.
            - It is described as ${marketSpace.description}.
            - It operates in the ${marketSpace.industry} industry.
            - The business type is ${marketSpace.businessType}.
            - The planned/actual year of founding is ${marketSpace.yearFounded?.toString()}.
            - The primary business goals are ${marketSpace.businessGoals}.
            - The target audience is people ${marketSpace.targetAudience}.
            - The products or services offered are ${marketSpace.productsServices}.
            - The unique selling proposition is ${marketSpace.uniqueSellingProposition}.
            
            **Business Strategy:**
            - The business strategy type is a/an ${values.strategyType}.
            - The purpose of this strategy is ${values.strategyPurpose}.
            
            **Team and Investment:**
            - The team size is ${marketSpace.team}.
            - The amount intended to be invested in the business is ${marketSpace.investment}.
            
            Your task is to create a branding strategy and plan that encompasses all these elements. Instead of merely advising, you will conduct thorough research and provide actionable steps, specific resources, and a clear roadmap for the entrepreneur. You will essentially perform the work for them and provide the information they need to execute the branding strategy. 
            
            For example, if the entrepreneur chooses a "Content Marketing" strategy, here is how you should structure your response:
            
            **Content Marketing Strategy:**
            Creating a successful content marketing strategy for your salon involves several detailed steps:
            
            1. **Content Creation Plan:**
               -  30x YouTube videos per month (minimum of 15:00 mins long) about how to style hair, tips for styling, and hair and clothing-related content.
               - 300 tweets per month about the hottest and latest styles you do and hair tips.
               - 300 TikTok posts on a person actually styling someone's hair, providing tips.
            
            2. **Content Calendar:**
               - YouTube:
                 - Mondays (evening) at 17:00
                 - Thursdays (morning) at 7:00
                 - Saturdays (afternoon) at 12:30
               - Twitter:
                 - Mondays (evening) at 17:00 x3 and morning at 7:00 x4
                 - Thursdays (morning) at 7:00 x5
                 - Saturdays (afternoon) at 12:30 x5
            
            3. **Keyword Research:**
               - Your target audience searches for these keywords so be sure to add them in your website SEO:
                 - hair, styling, nails, haircut
            
            4. **Content Production:**
               - YouTube:
                 - Include hairstyling tips, product recommendations, or customer transformations.
               - Twitter:
                 - Include hairstyling tips, product recommendations, or customer transformations.
               - Instagram:
                 - Include hairstyling tips, product recommendations, or customer transformations.
               - TikTok:
                 - Include hairstyling tips, product recommendations, or customer transformations.
            
            5. **Distribution Strategy:**
               - Website content distribution:
                 - Distribute blog posts 10 times a month linking to your best-performing YouTube videos.
               - Referral distribution:
                 - Set up a Google My Business account to get reviews and testimonials from customers to post on your tweets.
            
            6. **Engagement and Analytics:**
               - Actively hire people to respond to people in the comments on your platforms.
               - Use Google Analytics for your website traffic analysis.
            
            7. **Resource Recommendations:**
               - Here are some resources to help you with content marketing:
                 - [Link to a Content Calendar Template]
                 - [Link to SEO Keyword Research Tools]
                 - [Link to Blog Writing Tips]
                 - [Link to Social Media Scheduling Tools] 
            `,
          };
    
          const newMessages = [...messages, userMessage];
          
          const response = await axios.post('/api/openai', { messages: newMessages });
    
          setMessages((current) => [...current, userMessage, response.data]);
        
          form.reset();
    
        } catch (error) {
          toast.error('something went wrong')
        } finally {
          router.refresh();
        }
      };
    
      useEffect(() => {
        if (messages.length > 0) {
          sendData(messages[messages.length -1].content);
        }
      },[messages])
      
      const sendData = async (advice:string|undefined) => {
        const values = {
          advice,
          description,
          title: strategyName,
          type: strategyType,
        }
        try {
          console.log(typeof advice?.substring(0,10));
            await axios.patch(`/api/marketspaces/${marketSpace.id}/brandingstrategies/${brandingStrategy.id}`, values )
            toggleEdit()
            toast.success("Business Strategy updated successfully");
            router.refresh();
            router.push(`/projects/${marketSpace.id}/strategies/branding/${brandingStrategy.id}`);
        } catch  {
          toast.error('something went wrong')
        }
      }

// html components 
  return (
    <div>
         <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 relative mt-4 bg-white rounded-lg shadow p-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input               
                    className="outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading}
                    placeholder=" e.g branding strategy 1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="strategyType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>strategy type</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={isLoading}
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? predefinedStrategyTypes.find(
                              (strategyType) =>
                                strategyType.value === field.value
                            )?.value
                          : "Select  strategy type"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Industry..." />
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {predefinedStrategyTypes.map((strategyType) => (
                          <CommandItem
                            value={strategyType.value}
                            key={strategyType.value}
                            onSelect={() => {
                              form.setValue("strategyType", strategyType.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                strategyType.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {strategyType.value}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the strategy type that will be used in determining the
                  nature of your strategy
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="strategyPurpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>strategy purpose</FormLabel>
                <FormControl>
                  <Textarea
                 
                    className="outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading}
                    placeholder="e.g. 'to make a killer content creation strategy...'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full lg:justify-center gap-x-2 ">
            <Button
              className="w-full bg-orange-600 text-white active:scale-[0.99] transition-all lg:max-w-[70%]  "
              disabled={isLoading}
              type="submit"
            >
              save
            </Button>
          </div>
          <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isLoading || editing ? "block" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <Loader className="text-white animate-spin" size={48} />
    </div>
        </form>
        
      </Form>
      
    </div>
  )
}