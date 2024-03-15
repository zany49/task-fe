import CustomModal from "../modal/modal"



const Customtable = ({columns,data})=>{



    return(

        <>
        <table className="table">
            <thead>
                <tr>
               {columns.map((d)=>{
                return(
                    <th scope="col">{d.title}</th>
                )
               }
                )}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((d,i)=>{
               
                    {
                    return (
                    <tr key={i}>  
                      {columns.map((col,i)=>{
                    console.log(d,col,d[col.field])

                        return(
                            <>
                            {col.field === "action" ?(
                                <>
                                 <td scope="row"><CustomModal title="View user" btnType="secondary" data={d} /></td>
                                </>
                            ):col.field === "delete"?(
                                <>
                                 <td scope="row"><CustomModal title="Delete user" btnType="danger" data={d} /></td>
                                </>
                            ):( 
                            <td scope="row">{d[col.field]}</td>
                            )}
                            </>
                           
                        )
                       }
                        )}
                        </tr>
                        )
                    }
               }
                ):(
                    <>
                    No data found
                    </>
                )}
            </tbody>
            </table>
        
        </>
    )
}

export default Customtable