import {
  DollarCircleOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../API";
import Header from './Header'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import NavBar from '../NavBar'
import NavBar1 from "../NavBar1";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminHome() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(0);
      setRevenue(localStorage.getItem('reject'));
    });
    getInventory().then((res) => {
      setInventory(localStorage.getItem('totalreq'));
    });
    getCustomers().then((res) => {
      setCustomers(localStorage.getItem('approve'));
    });
  }, []);

  return (
  <div className='App1'>
   <NavBar1/>
    <div className="SideMenuAndPageContent">
    <Header/>
    
    <div className="das">
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal" style={{minWidth:'870px'}}>
        <DashboardCard
          icon={
            <EyeOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Page Viewed"}
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Request"}
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Approved"}
          value={customers}
        />
        
        
      </Space>
      <Space  style={{minWidth:'1070px'}}>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
    </div>
    </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
    
        const response = await axios.get('http://localhost:8080/services', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set the content type based on your server's requirements
          },
        });
    
        console.log('Request:', response.config);
        console.log('Response:', response);
    
        if (response.status === 200) {
          // Assuming the response contains an array of objects with scheme, id, name, and other properties
          const modifiedData = response.data.map(item => ({ ...item, approvalStatus: 'Approved' }));
          setDataSource(modifiedData);
        } else {
          // Handle other status codes or errors
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const columns = [
    {
      title: 'Scheme',
      dataIndex: 'scheme',
    },
    {
      title: 'UserId',
      dataIndex: 'id',
    },
    {
      title: 'UserName',
      dataIndex: 'name',
    },
    {
      title: 'Approved',
      dataIndex: 'approvalStatus',
    },
  ];

  return (
    <div style={{ width: '450px' }}>
      <Typography.Text>Recent Requests</Typography.Text>
      <Space direction="vertical" style={{ marginTop: '16px' }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          loading={loading}
          style={{ width: '550px', height: '200px' }}
        />
      </Space>
    </div>
  );
}
function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Loan Applied As Of Now",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Most Frequently Loan Applied User",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 300 ,marginLeft:'100px',marginTop:'50px'}}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );

}
export default AdminHome;
