import { useCallback, useEffect, useState } from "react";
type MyFormData={
    [key:string]:any
}
interface DataFetcher<T>{
    (args:T&{page:number;pageSize:number}):Promise<any>
}

function useDataList<T extends MyFormData,U>(initialFormData:T,fetchData:DataFetcher<T>){
    const [page,setPage]=useState<number>(1)
    const [pageSize,setPageSize]=useState<number>(10)
    const [loading,setLoading]=useState<boolean>(false)
    const [total,setTotal]=useState<number>(0)
    const [dataList,setDataList]=useState<U[]>([])
    const [formData,setFormData]=useState<T>(initialFormData)

    const loadData=useCallback(async ()=>{
        setLoading(true)
        try{
            const {data:{list,total}}=await fetchData({page,pageSize,...formData})
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    },[formData,page,pageSize,fetchData])

    useEffect(()=>{
        loadData()
    },[loadData])

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const onChange=(page:number,pageSize:number)=>{
        setPage(page)
        setPageSize(pageSize)
    }

    return {dataList,page,pageSize,setDataList,
        setFormData,setLoading,setPage,setPageSize,
        setTotal,total,formData,loadData,onChange,handleChange,loading}
}
export default useDataList