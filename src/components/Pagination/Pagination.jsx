import React, {useEffect, useState} from 'react';
import "./pagination.scss";

const Pagination = ({posts}) => {

    const [postPerPage, SetPostPerPage] = useState(10);
    const [currentPage, SetCurrentPage] = useState(1);

    const [pageItem, SetPageItem] = useState({
        start: 0,
        end: postPerPage
    })

    const onPageChangeEvent = (start, end) => {
        SetPageItem({
            start: start,
            end: end
        })
    }

    const OnPerPostChangeEvent = (e) => {
        SetPostPerPage(e.target.value);
        SetCurrentPage(1);
    }



    const numOfPages = Math.ceil(posts.length / postPerPage);
    // console.log(numOfPages);

    const numOfButtons = [];
    for (let i = 1; i <= numOfPages; i++) {
        numOfButtons.push(i);
    }

    const prevPageClick = () => {
        if (currentPage === 1) {
            SetCurrentPage(currentPage);
        } else {
            SetCurrentPage(currentPage - 1);
        }
    }


    const nextPageClick = () => {
        if (currentPage === numOfButtons.length) {
            SetCurrentPage(currentPage);
        } else {
            SetCurrentPage(currentPage + 1);
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
            // from 5 to 8 -> (10 - 2)
            const sliced1 = numOfButtons.slice(currentPage - 2, currentPage)
            // sliced1 (5-2, 5) -> [4,5]
            const sliced2 = numOfButtons.slice(currentPage, currentPage + 1)
            // sliced1 (5, 5+1) -> [6]
            tempNumberOfButtons = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numOfButtons.length])
            // [1, '...', 4, 5, 6, '...', 10]
        }

        else if (currentPage > numOfButtons.length - 3) {
            // > 7
            const sliced = numOfButtons.slice(numOfButtons.length - 4)
            // slice(10-4)
            tempNumberOfButtons = ([1, dotsLeft, ...sliced])
        }

        else if (currentPage === dotsInitial) {
            SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
        }
        else if (currentPage === dotsRight) {
            SetCurrentPage(arrOfCurrButtons[3] + 2)
        }

        else if (currentPage === dotsLeft) {
            SetCurrentPage(arrOfCurrButtons[3] - 2)
        }

        setArrOfCurrButtons(tempNumberOfButtons);
        const value = currentPage * postPerPage;

        onPageChangeEvent(value - postPerPage, value)
    }, [currentPage, postPerPage, numOfPages]);

    return (
        <>
            <div className="dt-pagination">
                <ul className="dt-pagination-ul">
                    <li className={`dt-item ${currentPage === 1 ? 'disabled': ''}`}><a className="dt-link" onClick={prevPageClick}>Prev</a></li>
                    {
                        arrOfCurrButtons.map((data, index) => {
                            return (
                                <li key={index} className={`dt-item ${currentPage === data ? 'active' : ''}`}><a className="dt-link" onClick={() => SetCurrentPage(data)}>{data}</a></li>
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