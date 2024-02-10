import React from "react"
import { SyncLoader } from "react-spinners"
import "../css/common.css"

const Loader = ({ loading }) => {
    return <>
        {loading && <div className="spinner-container">
            <SyncLoader loading={loading} color="blue"></SyncLoader>
        </div>}
    </>

}

export default Loader;