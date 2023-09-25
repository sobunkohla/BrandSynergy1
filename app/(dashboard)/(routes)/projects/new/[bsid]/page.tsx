
import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/custom/icon-badge";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/title-form";

const CreateMarketSpacePage = async ({
  params,
}: {
  params: { bsid: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const marketspace = await db.marketSpace.findUnique({
    where: {
      id: params.bsid,
    },
  });

  if (!marketspace) {
    return redirect("/");
  }

  const requiredFields = [
    marketspace.businessName,
    marketspace.location,
    marketspace.description,
    marketspace.industry,
    marketspace.businessType,
    marketspace.yearFounded,
    marketspace.businessGoals,
    marketspace.targetAudience,
    marketspace.productsServices,
    marketspace.team,
    marketspace.uniqueSellingProposition,
    marketspace.imageUrl,
  ];

  const totalFields = requiredFields.length + 1;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">MarketSpace setup</h1>
          <span className="text-sm text-slate-700">
            complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
        <div>
          <div className="flex items-center gap-x-2 ">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your Market Space</h2>

          </div>
          <TitleForm
          initialData={marketspace}
          marketspaceId={marketspace.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateMarketSpacePage;

{
  /* <div className="container mx-auto p-8">
      {success && (
        <div className="bg-green-400 absolute left-[40%] top-10 z-50 text-white p-2 mb-4 rounded-md">
          Data saved successfully!
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-6">Create New Market Space</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Business Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="businessName" className="text-gray-600">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="e.g., ABC Tech Solutions"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="location" className="text-gray-600">
                Location
              </label>
              <div className="relative">
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleSelectChange}
                  className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select a Location</option>
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="customLocation"
                  name="customLocation"
                  value={formData.location}
                  onChange={handleChange}
                  className="hidden border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 absolute top-0 left-0 w-full h-full"
                  placeholder="Enter Custom Location"
                />
              </div>
            </div>

            
            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="Briefly describe your business, its mission, and what it intends to offer."
                rows={4}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
  <label htmlFor="team" className="text-gray-600">Team Size</label>
  <select
    id="team"
    name="team"
    value={formData.team}
    onChange={handleChange}
    className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
    required
  >
    <option value="">Select Team Size</option>
    {teamSizeOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

            
            <div className="flex flex-col space-y-2">
              <label htmlFor="industry" className="text-gray-600">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleSelectChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select an Industry</option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="flex flex-col space-y-2">
              <label htmlFor="businessType" className="text-gray-600">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleSelectChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select a Business Type</option>
                {businessTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

           
            <div className="flex flex-col space-y-2">
              <label htmlFor="yearFounded" className="text-gray-600">
                Year Founded (Planned)
              </label>
              <select
                id="yearFounded"
                name="yearFounded"
                value={formData.yearFounded}
                onChange={handleSelectChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select a Year</option>
                {yearFoundedOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

           
            <div className="flex flex-col space-y-2">
              <label htmlFor="businessGoals" className="text-gray-600">
                Business Goals
              </label>
              <textarea
                id="businessGoals"
                name="businessGoals"
                value={formData.businessGoals}
                onChange={handleChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="Outline the short-term and long-term goals the business aims to achieve."
                rows={4}
                required
              />
            </div>

         
            <div className="flex flex-col space-y-2">
              <label htmlFor="targetAudience" className="text-gray-600">
                Target Audience
              </label>
              <select
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleSelectChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Target Audience</option>
                {targetAudienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="productsServices" className="text-gray-600">
                Products/Services
              </label>
              <textarea
                id="productsServices"
                name="productsServices"
                value={formData.productsServices}
                onChange={handleChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="Briefly describe the products or services the business plans to offer."
                rows={4}
                required
              />
            </div>

          
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="uniqueSellingProposition"
                className="text-gray-600"
              >
                Unique Selling Proposition (USP)
              </label>
              <select
                id="uniqueSellingProposition"
                name="uniqueSellingProposition"
                value={formData.uniqueSellingProposition}
                onChange={handleSelectChange}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select a Unique Selling Proposition</option>
                {uniqueSellingPropositionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

       
            {previewImage && (
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600">Preview Image</label>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 max-h-40 object-cover"
                />
              </div>
            )}

           
            <div className="flex flex-col space-y-2">
              <label htmlFor="image" className="text-gray-600">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <Link href={`new/${formData.businessName}`}>
            <button
              type="button"
              onClick={() => {
                handleSubmit();
                setSuccess(true);
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Continue
            </button>
          </Link>
        </form>
      </div>
    </div> */
}

// const industryOptions = [
//   "Technology",
//   "Healthcare",
//   "Retail",
//   "Finance",
//   "Entertainment",
//   "Automotive",
//   "Real Estate",
//   "Education",
//   "Food & Beverage",
//   "Fashion",
//   "Travel & Tourism",
//   "Sports",
// ];
// const targetAudienceOptions = [
//   "Under 18 - Male",
//   "Under 18 - Female",
//   "18-24 - Male",
//   "18-24 - Female",
//   "25-34 - Male",
//   "25-34 - Female",
//   "35-44 - Male",
//   "35-44 - Female",
//   "45-54 - Male",
//   "45-54 - Female",
//   "55-64 - Male",
//   "55-64 - Female",
//   "65 or Above - Male",
//   "65 or Above - Female",
//   "all male",
//   "all female",
//   "under 18",
//   "18-24",
//   "25-34",
//   "35-44",
//   "45-54",
//   "55-64",
//   "65 or Above",
// ];
// const locationOptions = [
//   "New York, USA",
//   "Los Angeles, USA",
//   "Chicago, USA",
//   "San Francisco, USA",
//   "London, UK",
//   "Paris, France",
//   "Toronto, Canada",
//   "Sydney, Australia",
//   "Tokyo, Japan",
//   "Berlin, Germany",
//   "Singapore",
//   "South Africa",
//   "World Wide",
//   "Other",
// ];
// const uniqueSellingPropositionOptions = [
//   "Quality Products",
//   "Affordable Prices",
//   "Innovative Technology",
//   "Exceptional Customer Service",
//   "Sustainability",
//   "Unique Design",
//   "Local Sourcing",
//   "Fast Shipping",
//   "Customization Options",
//   "Limited Editions",
//   "Exclusive Partnerships",
// ];

// const businessTypeOptions = [
//   "Sole Proprietorship",
//   "Partnership",
//   "LLC",
//   "Corporation",
//   "Nonprofit",
//   "Cooperative",
//   "Franchise",
//   "Joint Venture",
//   "Limited Partnership",
// ];

// const yearFoundedOptions = [];
// // Generate a range of years, e.g., from 1950 to 2023
// for (let year = 1950; year <= 2023; year++) {
//   yearFoundedOptions.push(year.toString());
// }

// const [formData, setFormData] = useState({
//   businessName: "",
//   location: "",
//   description: "",
//   industry: "",
//   businessType: "",
//   yearFounded: "",
//   businessGoals: "",
//   targetAudience: "",
//   productsServices: "",
//   uniqueSellingProposition: "",
//   image: null as File | null,
// });

// const [previewImage, setPreviewImage] = useState<string | null>(null);
// const [success, setSuccess] = useState(false);
// const handleChange = (
//   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };
// const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files && e.target.files[0];

//   if (file) {
//     // Read and display the selected image as a preview
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setPreviewImage(event.target?.result as string);
//     };
//     reader.readAsDataURL(file);

//     // Set the selected image in the form data
//     setFormData((prevData) => ({
//       ...prevData,
//       image: file,
//     }));
//   }
// };
// if (success) {
//   setTimeout(() => {
//     setSuccess(false);
//   }, 500);
// }

// const handleSubmit = () => {
//   // Handle form submission, e.g., send data to the server or API
// };
