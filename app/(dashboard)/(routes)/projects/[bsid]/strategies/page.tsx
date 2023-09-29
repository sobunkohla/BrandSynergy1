import Heading from '@/components/custom/heading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft, FaMountain } from 'react-icons/fa';

const CreateMarketSpacePage = ({
  params,
}: {
  params: { bsid: string };
}) => {
  // ... Previous code for business information form ...

  return (
    <div className="container mx-auto p-8">
      {/* ... Previous code ... */}
      <div className='flex items-center justify-between'>
         <Heading title='Choose Your Strategy' icon={FaMountain} bgColor='bg-orange-200' iconColor='text-white' description='choose a path to take with your business'/>
         <Link href={`/projects/`}>
          <Button className="flex items-center text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 ">
            <FaArrowLeft size={20} className="mr-2" /> Back
          </Button>
        </Link>
      </div>
      {/* Continue to the next page */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Choose Your Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Branding Strategies */}
          <div className="bg-orange-500 text-white rounded-lg shadow p-6 cursor-pointer transition transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold mb-2">Branding Strategies</h3>
            <p className="text-gray-200 text-lg mb-4">
              Elevate your personal or business brand with expert strategies.
            </p>
            {/* Add an image here */}
            <Link href={`/projects/${params.bsid}/strategies/branding`}>
            <button
              className="bg-transparent border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-orange-500 transition duration-300"
              
              >
              Get Started
            </button>
          </Link>
          </div>
          
          {/* Card 2: Business Strategies */}
          <div className="bg-orange-500 text-white rounded-lg shadow p-6 cursor-pointer transition transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold mb-2">Business Strategies</h3>
            <p className="text-gray-200 text-lg mb-4">
              Gain insights and plans to grow and succeed in your industry.
            </p>
            {/* Add an image here */}
            <Link href={`/projects/${params.bsid}/strategies/business`}>

            <button
              className="bg-transparent border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-orange-500 transition duration-300"
              
              >
              Get Started
            </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMarketSpacePage;
