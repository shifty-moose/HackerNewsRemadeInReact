import React from 'react';     

const NumBtnGen = (props) => {

  const { btmClass, currentPage, setCurrentPage } = props;

  const bottomClass = props.btmClass;

  if (currentPage === 0) {
    return (
        <div className={`pageButtons ${bottomClass}`}>
        <div>
            <button className="activeNumBtn">{currentPage + 1}</button> 
            <button 
            className="numBtn"
            onClick={() => {
                setCurrentPage(currentPage + 1);
            }}
            >{currentPage + 2}</button>
            <button 
            className="numBtn"
            onClick={() => {
                setCurrentPage(currentPage + 2);
            }}
            >{currentPage + 3}</button>
        </div>
        
        <p>..</p>

        <button 
            className="numBtn"
            onClick={() => setCurrentPage(49)}>
                50
        </button>

        <button
            onClick={() => {
            setCurrentPage(currentPage + 1);
            }}>
          Next
        </button>
      </div>
    )
  } else if (currentPage === 49) {
        return (
            <div className={`pageButtons ${bottomClass}`}>
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}>
                Back
                </button>

                <div>
                    <button 
                    className="numBtn"
                    onClick={() => {
                        setCurrentPage(currentPage -2);
                    }}        
                    >{currentPage -1}</button> 
                    <button 
                    className="numBtn"
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                    }}        
                    >{currentPage}</button>
                    <button className="activeNumBtn">{currentPage + 1}</button>
                </div>
            </div>
    )
  } else if (currentPage === 48) {
    return (
        <div className={`pageButtons ${bottomClass}`}>
            <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}>
            Back
            </button>

            <div>
            <button 
            className="numBtn"
            onClick={() => {
                setCurrentPage(currentPage - 1);
            }}

            >{currentPage}</button> 
            <button className="activeNumBtn">{currentPage + 1}</button>
            <button 
            className="numBtn"
            onClick={() => {
                setCurrentPage(currentPage + 2);
            }}

            >{currentPage + 2}</button>
            </div>

            <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 0}>
            Next
            </button>
        </div>
        )

  } else if (currentPage > 0 && currentPage < 49) {

    return (
        <div className={`pageButtons ${bottomClass}`}>

            <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}>
            Back
            </button>

            <div>
                <button     
                className="numBtn"
                onClick={() => setCurrentPage(currentPage - 1)}
                >{currentPage}</button> 

                <button className="activeNumBtn">{currentPage + 1}</button>

                <button 
                className="numBtn"
                onClick={() => setCurrentPage(currentPage + 1)}
                >{currentPage + 2}</button>
            </div>

            <p>...</p>

            <button 
                className="numBtn"
                onClick={() => setCurrentPage(49)}>50
            </button>

            <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 0}>
            Next
            </button>

        </div>
        )
    }
}

export default NumBtnGen;