import React, { useState, useEffect } from "react";
import { fetchApi } from '../service/api';

export default function useDataFetching(dataSource) {



    return {
        error,
        loading,
        results
    };
}
