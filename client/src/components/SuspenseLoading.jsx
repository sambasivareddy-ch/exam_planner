import React, { Suspense } from "react";

import Loading from "../components/Loading";

const SuspenseLoading = (props) => {
    return (
        <Suspense fallback={<Loading />}>
            {props.children}
        </Suspense>
    )
}

export default SuspenseLoading;