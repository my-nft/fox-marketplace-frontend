import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
ChartJS.register(...registerables);

const PriceHistory = ({ itemExtra, isLoading }) => {
  const params = useParams();
  console.log(params);

  const [chartDataset, setChartDataset] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    let data = [];
    let labels = [];
    itemExtra.map((item) => {
      data.push(item.price);
      labels.push(
        new Date(item.date_event).toLocaleString("en-US", {
          month: "short",
          hour: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      );
    });
    setChartDataset(data);
    setChartLabels(labels);
  }, [itemExtra]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        id: 1,
        label: "Price History",
        data: chartDataset,
      },
    ],
  };

  const options = {
    title: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 16,
        right: 48,
        top: 48,
        bottom: 48,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        display: true,
        xPadding: 8,
        yPadding: 8,
        backgroundColor: "#f58103",
      },
    },
    scales: {
      y: {
        ticks: {
          padding: 20,
        },
        grid: {
          color: "rgba(247,247,247,.03)",
          lineWidth: 2,
          borderDash: [],
          drawOnChartArea: true,
          drawTicks: false,
        },
      },
      x: {
        ticks: {
          padding: 20,
        },
        stacked: true,
      },
    },
    elements: {
      point: {
        radius: 4,
        pointStyle: "circle",
        borderColor: "#f58103",
        borderWidth: 2,
        backgroundColor: "#fff",
      },
      line: {
        borderColor: "#f58103",
        tension: 0.2,
      },
    },
  };

  return (
    <InfoBoxWrapper title="Price History">
      <div className="priceHistory">
        {chartDataset.length !== 0 && (
          <Line data={chartData} options={options} />
        )}
        {isLoading && (
          <Spinner>
            <p>Fetching Data</p>
          </Spinner>
        )}
        {chartDataset.length === 0 && (
          <div className="noContent">
            <ContentIcon />
            <p>No Price History</p>
          </div>
        )}
      </div>
    </InfoBoxWrapper>
  );
};

export default PriceHistory;
