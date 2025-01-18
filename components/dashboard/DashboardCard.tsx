"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

const DashboardCard: React.FC = () => {
  const [chart1Data, setChart1Data] = useState<ChartData>({
    labels: ["Category A", "Category B", "Category C"],
    datasets: [
      {
        label: "Posts Distribution",
        data: [40, 30, 30],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  });

  const [chart2Data, setChart2Data] = useState<ChartData>({
    labels: ["Subcategory A1", "Subcategory B1", "Subcategory C1"],
    datasets: [
      {
        label: "Details Distribution",
        data: [20, 50, 30],
        backgroundColor: ["#6366F1", "#22D3EE", "#E879F9"],
        borderWidth: 1,
      },
    ],
  });

  const handleChart1Click = (event: any, elements: any[]) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const newChartData: ChartData = {
        labels: [
          `Detailed A${clickedIndex + 1}`,
          `Detailed B${clickedIndex + 1}`,
          `Detailed C${clickedIndex + 1}`,
        ],
        datasets: [
          {
            label: `Updated Data for Category ${clickedIndex + 1}`,
            data: [
              10 * clickedIndex + 10,
              20 * clickedIndex + 10,
              30 * clickedIndex + 10,
            ],
            backgroundColor: ["#F87171", "#34D399", "#60A5FA"],
            borderWidth: 1,
          },
        ],
      };
      setChart2Data(newChartData);
    }
  };

  const chart1Options = {
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        handleChart1Click(event, elements);
      }
    },
  };

  return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-4">
      <CardContent>
        <h3 className="text-3xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200">
          Posts
        </h3>
        <div className="flex justify-center items-start gap-8">
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-2 text-center text-slate-600 dark:text-slate-300">
              Chart 1: Main Categories
            </h4>
            <Pie
              data={chart1Data}
              className="w-64 h-64"
              options={chart1Options}
            />
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-2 text-center text-slate-600 dark:text-slate-300">
              Chart 2: Detailed View
            </h4>
            <Pie data={chart2Data} className="w-64 h-64" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
