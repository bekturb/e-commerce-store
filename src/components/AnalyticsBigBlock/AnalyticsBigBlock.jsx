import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../features/allCategories';
import { fetchUsers } from '../../features/users';
import "./analytic-big-block.scss";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const AnalyticsBigBlock = () => {
    const dispatch = useDispatch();

    const { data: shopOrder, loading: shopOrderLoading, error: shopOrderError } = useSelector(state => state.shopOrder);
    const { data: products, loading: productsLoading, error: productsError } = useSelector(state => state.shopProducts);
    const { data: allCategories, loading: allCatLoading, error: allCateErr } = useSelector(state => state.allCategories);
    const { data: userData, loading: userLoad, error: userErr } = useSelector(state => state.users);

    let outOfStock = 0;

    products?.forEach((item) => {
        if (item.totalQuantity === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(fetchAllCategories());
        dispatch(fetchUsers());
    }, [dispatch]);

    let totalAmount = shopOrder?.reduce((total, order) => total + order.totalPrice, 0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();

    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: months.map((m, i) => shopOrder?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 2).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) => shopOrder?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) => shopOrder?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.totalPrice, 0)),
            },
        ],
    };

    const statuses = ['Processing', 'Shipped', 'Delivered'];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
                hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
                data: statuses.map((status) => shopOrder?.filter((item) => item.status === status).length),
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#22c55e'],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
                data: [outOfStock, products?.length - outOfStock],
            },
        ],
    };

    const barState = {
        labels: allCategories?.map((cat) => cat.name),
        datasets: [
            {
                label: "Products",
                borderColor: '#9333ea',
                backgroundColor: '#9333ea',
                hoverBackgroundColor: '#6b21a8',
                data: allCategories?.map((cat) => products?.filter((item) => item.category === cat._id).length),
            },
        ],
    };
    return (
        <div className="big-block big-block--position">
            <div className='big-block__chart'>
                <div className="big-block__header">
                    <h2 className="big-block__title">Listing Board</h2>
                </div>
                <div className="big-block__average">
                    <ul className="avarege-list">
                        <li className="average-list__item">
                            <div className="average-list__dot"></div>
                            <p className="avarage-list__title">Sale</p>
                        </li>
                    </ul>
                    <div className="big-block__buttons">
                        <button className="big-block__button">
                            Total
                        </button>
                        <button className="big-block__button">
                            Average
                        </button>
                    </div>
                </div>
                <div className="big-block__area-chart">
                    <div className='charts'>
                        <div className='charts__types'>
                            <div className='charts__bar'>
                                <Line data={lineState} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='big-block__chart'>
                <div className='charts__bar'>
                    <Bar options={options} data={barState} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsBigBlock;