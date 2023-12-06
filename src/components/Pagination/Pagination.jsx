import React, {useEffect, useState} from 'react';
import "./pagination.scss";
import {useDispatch, useSelector} from "react-redux";
import {filterProductsActions} from "../../features/productFilterSlice";

const Pagination = ({posts, setPageItem}) => {

    const {currentPage, perPage} = useSelector(state => state.filterProducts);

    const dispatch = useDispatch();

    const onPageChangeEvent = (start, end) => {
        setPageItem({
            start: start,
            end: end
        })
    }

    const numOfPages = Math.ceil(posts.length / +perPage);

    const numOfButtons = [];
    for (let i = 1; i <= numOfPages; i++) {
        numOfButtons.push(i);
    }

    const prevPageClick = () => {
        if (currentPage === 1) {
            dispatch(filterProductsActions.setCurrentPage(currentPage))
        } else {
            dispatch(filterProductsActions.setCurrentPage(currentPage - 1))
        }
    }


    const nextPageClick = () => {
        if (currentPage === numOfButtons.length) {
            dispatch(filterProductsActions.setCurrentPage(currentPage))
        } else {
            dispatch(filterProductsActions.setCurrentPage(currentPage + 1))
        }
    }

    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

    useEffect(() => {
        let tempNumberOfButtons = [...arrOfCurrButtons]

        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (numOfButtons.length < 6) {
            tempNumberOfButtons = numOfButtons
        }

        else if (currentPage >= 1 && currentPage <= 3) {
            tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length]
        }

        else if (currentPage === 4) {
            const sliced = numOfButtons.slice(0, 5)
            tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length]
        }

        else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {

            const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);

            const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);

            tempNumberOfButtons = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numOfButtons.length])
        }

        else if (currentPage > numOfButtons.length - 3) {

            const sliced = numOfButtons.slice(numOfButtons.length - 4)

            tempNumberOfButtons = ([1, dotsLeft, ...sliced])
        }

        else if (currentPage === dotsInitial) {
            dispatch(filterProductsActions.setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1))
        }
        else if (currentPage === dotsRight) {
            dispatch(filterProductsActions.setCurrentPage(arrOfCurrButtons[3] + 2))
        }

        else if (currentPage === dotsLeft) {
            dispatch(filterProductsActions.setCurrentPage(arrOfCurrButtons[3] - 2))
        }

        setArrOfCurrButtons(tempNumberOfButtons);
        const value = currentPage * +perPage;

        onPageChangeEvent(value - +perPage, value)
    }, [currentPage, perPage, numOfPages]);

    return (
        <>
            <div className="dt-pagination">
                <ul className="dt-pagination-ul">
                    <li className={`dt-item ${currentPage === 1 ? 'disabled': ''}`}><a className="dt-link" onClick={prevPageClick}>Prev</a></li>
                    {
                        arrOfCurrButtons.map((data, index) => {
                            return (
                                <li key={index} className={`dt-item ${currentPage === data ? 'active' : ''}`}><a className="dt-link" onClick={() => dispatch(filterProductsActions.setCurrentPage(data))}>{data}</a></li>
                            )
                        })
                    }
                    <li className={`dt-item ${currentPage === numOfButtons.length ? 'disabled': ''}`}><a className="dt-link" onClick={nextPageClick}>Next</a></li>
                </ul>
            </div>
        </>
    );
};

export default Pagination;