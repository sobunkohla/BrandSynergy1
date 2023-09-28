



export default function StrategyCard({ strategy }: {
    strategy: {
        title: string,
        description: string,
        id: number
    }
}) {
  return (
    <div
              
              className="bg-gray-200 rounded-lg shadow p-4 transition duration-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{strategy.title}</h2>
              <p className="text-gray-600">{strategy.description}</p>
              {/* Add more details or buttons as needed */}
            </div>
  )
}