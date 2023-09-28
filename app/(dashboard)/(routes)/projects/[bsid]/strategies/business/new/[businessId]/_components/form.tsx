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
import { BusinessStrategy, MarketSpace } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ChatCompletionRequestMessage } from "openai";
import StrategyCard from "@/components/custom/strategy-card";
import { title } from "process";

const predefinedStrategyTypes = [
    { value: "Business Objectives" },
    { value: "Market Analysis" },
    { value: "Target Market" },
    { value: "Competition Analysis" },
    { value: "SWOT Analysis" },
    { value: "Services" },
    { value: "Marketing and Sales Strategy" },
    { value: "Financial Projections" },
    { value: "Other" },
  ];

interface Props {
    marketSpace: MarketSpace;
    userId: string;
    businessStrategy: BusinessStrategy;
}

export default function FormPage({
    
marketSpace, userId, businessStrategy
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
          strategyType: businessStrategy?.type || '',
          strategyPurpose: businessStrategy?.description || '',
           title: businessStrategy?.title || '',
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
            content: `You are a highly experienced business strategist, and you've been tasked with creating a comprehensive business strategy and plan for a budding entrepreneur who is passionate but entirely new to the business world by doing the research for them and providing data relevent to only what you currently know and instead of  also teling them what to do and how to do it  and vaigue advise you do if for them and tell them what you know or found  . This individual has a business idea and some initial information, but they need your expertise to turn it into a well-thought-out plan.

            **Business Overview:**
            - The name of the business is ${marketSpace.businessName}.
            - The business is located in ${marketSpace.location}.
            - It is described as ${marketSpace.description}.
            - It operates in the ${marketSpace.industry} industry.
            - The business type is ${marketSpace.businessType}.
            - The planned year of founding is ${marketSpace.yearFounded?.toString()}.
            - The primary business goals are ${marketSpace.businessGoals}.
            - The target audience is ${marketSpace.targetAudience}.
            - The products or services offered are ${marketSpace.productsServices}.
            - The unique selling proposition is ${marketSpace.uniqueSellingProposition}.
            
            **Business Strategy:**
            - The business strategy type is a/an ${values.strategyType}.
            - The purpose of this strategy is ${values.strategyPurpose}.
            
            **Team and Investment:**
            - The team size is ${marketSpace.team}.
            - The amount intended to be invested in the business is ${marketSpace.investment}.
            
            Your task is to create a business strategy and plan that encompasses all these elements. Provide actionable advice, specific resources, and a clear roadmap for the entrepreneur. The goal is to empower them to successfully build and scale their business. Use your expertise to guide them in every aspect of this journey.
            
            For example, if we take inspiration from a successful Hair Salon Business Plan, you will use each section as inspiration of what to do based ont the type of business strategy they choose if they choose a section look for the similar section and use it as inspiraton for the format you through the following sections in detail since this i the data and format you will be giving them the info in but you only do it for one section as they select the businessStrategy type but you go in further detail :
            
            ### Hair Salon Business Plan
            
            **Executive Summary**
            
            - Business Name: [Your Salon's Name]
            - Business Type: Hair Salon
            - Location: [City, State]
            - Founder/Owner: [Your Name]
            - Date Established: [Month, Year]
            
            **Mission Statement**
            
            - [Your Salon's Name] is dedicated to providing high-quality hair care and styling services in a welcoming and relaxed environment. We aim to enhance our clients' natural beauty, boost their confidence, and create lasting relationships through exceptional customer service and expertise.
            
            **Business Objectives**
            
            1. Establish [Your Salon's Name] as a leading hair salon in the local community within the first year.
            2. Maintain a 90% customer retention rate by consistently exceeding client expectations.
            3. Achieve a 20% year-over-year revenue growth for the first three years.
            4. Expand the range of services offered to include spa treatments and beauty products within five years.
            
            **Market Analysis**
            
            **Target Market**
            
            - [Your Salon's Name] will cater to a diverse clientele, primarily focusing on:
              - Men and women aged 18 to 60
              - Residents of [Your City] and the surrounding areas
              - Individuals who value high-quality hair care and styling services
              - Specialized services for weddings, proms, and other events
            
            **Competition**
            
            - Key competitors in the area include [Competitor 1], [Competitor 2], and [Competitor 3]. [Your Salon's Name] aims to differentiate itself by offering exceptional customer service, highly trained stylists, and a relaxing atmosphere.
            
            **SWOT Analysis**
            
            - Strengths: Skilled and experienced stylists, excellent customer service, prime location.
            - Weaknesses: New entrant, limited initial customer base.
            - Opportunities: Growing beauty and grooming industry, expanding services.
            - Threats: Competition, economic downturns, changing beauty trends.
            
            **Services**
            
            - [Your Salon's Name] will offer a variety of services, including:
              - Haircuts and Styling: Precision haircuts, blowouts, styling, and updos.
              - Hair Coloring: Highlights, lowlights, full color, and balayage.
              - Extensions: Hair extensions and weaves.
              - Texture Services: Perms and relaxers.
              - Spa Services: Massages, facials, manicures, and pedicures (future expansion).
              - Retail: High-quality hair care products for sale.
            
            **Marketing and Sales Strategy**
            
            **Marketing Plan**
            
            - Online Presence: Create a professional website and social media profiles (Facebook, Instagram) to showcase salon services, promotions, and client testimonials.
            - Local Advertising: Utilize local newspapers, magazines, and radio stations to reach the target audience.
            - Partnerships: Collaborate with local businesses for cross-promotions and referrals.
            - Client Loyalty Program: Implement a rewards program to incentivize repeat business.
            - Special Events: Host regular events and workshops to attract new clients.
            
            **Sales Strategy**
            
            - Provide excellent customer service to encourage repeat business and word-of-mouth referrals.
            - Offer introductory promotions and loyalty discounts.
            - Train stylists to upsell services and retail products.
            - Maintain an efficient appointment booking system.
            - Monitor customer feedback and adjust services accordingly.
            
            **Financial Projections**
            
            **Start-up Costs**
            
            - Lease and Renovation: $XX,XXX
            - Equipment and Furniture: $XX,XXX
            - Initial Inventory: $XX,XXX
            - Marketing and Advertising: $XX,XXX
            - Licenses and Permits: $X,XXX
            - Working Capital: $XX,XXX
            
            **Revenue Projections (Year 1)**
            
            - Total Revenue: $XXX,XXX
            - Operating Expenses: $XX,XXX
            - Net Profit: $XX,XXX
            
            **Funding Requirements**
            
            - [Your Salon's Name] is seeking $XX,XXX in funding to cover start-up costs and initial operational expenses. Funding will be used for lease payments, equipment, inventory, marketing, and working capital.
            
            **Conclusion**
            
            - [Your Salon's Name] is committed to delivering exceptional hair care and styling services while building a strong client base in [Your City]. With a well-planned marketing strategy, highly skilled stylists, and a dedication to customer satisfaction, we are confident in our ability to achieve our business objectives and thrive in the competitive beauty industry.
            
            **Resources for Execution**
            
            Here is a list of resources you will need to achieve what has been advised:
            
            1. **Website Builders:**
               - [Wix](https://www.wix.com)
               - [Squarespace](https://www.squarespace.com)
            
            2. **Local Advertising Channels:**
               - [Local Newspaper Name]
               - [Local Magazine Name]
               - [Local Radio Station Name]
            
            3. **Customer Relationship Management (CRM) Software:**
               - [CRM Tool Name]
            
            4. **Beauty Product Suppliers:**
               - [Supplier Name 1]
               - [Supplier Name 2]
            
            5. **Salon Equipment Suppliers:**
               - [Equipment Supplier Name 1]
               - [Equipment Supplier Name 2]
            
            6. **Financial Software for Budgeting:**
               - [Financial Software Name]
            
            These resources will assist you in implementing the strategies and plans effectively. Each resource is carefully selected to support your specific needs in building and growing your hair salon business.
            
               your advice should be in the form of you doing everything for them less of advising and more like doing the research for them based on the current data you possess and centered around a section of this example based on the type of market strategy and its purpose they choose  but go in further depth and provide all the granular detail make it a bit lenghty
               no intro just get to the point 
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
            await axios.patch(`/api/marketspaces/${marketSpace.id}/businessstrategies/${businessStrategy.id}`, values )
            toggleEdit()
            toast.success("Business Strategy updated successfully");
            router.refresh();
            router.push(`/projects/${marketSpace.id}/strategies/business/${businessStrategy.id}`);
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
                    placeholder=" e.g business strategy 1"
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
        isLoading && editing ? "block" : "hidden"
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