import axios from "axios"
import { useEffect, useState } from "react"


function App() {

  const [formData, setFormData] = useState({

    full_name: "",
    phone: "",
    email: "",
    location: "",
    property_type: "",
    system_size: "",
    source: ""
  })


  const [leads, setLeads] = useState([])
  const [editId,seteditId] =useState(null)
 // GET ALL LEADS
  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/leads/")
      setLeads(response.data)
     }
     catch (error) {
      console.log(error)
    }
  }
useEffect(() => {fetchLeads()}, [])
// HANDLE INPUT
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value})
  }
// Update and ADD LEAD
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId){
        await axios.put(`http://127.0.0.1:8000/update-lead/${editId}/`,formData)
        alert("Lead Updated Successfully")
      }
      else {
          await axios.post("http://127.0.0.1:8000/add-lead/",formData)
          alert("Lead Added Successfully")
        }
      fetchLeads()
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        location: "",
        property_type: "",
        system_size: "",
        source: ""
      })
   seteditId(null)
}

    catch (error) {
      console.log(error)
      alert("Error Adding Lead")
    }
  }
// Deletion 
const deleteLead = async (id)=>{
  try{
    await axios.delete(`http://127.0.0.1:8000/delete-lead/${id}/`)
    alert("Lead Deleted Successfully")
    fetchLeads()
  }
  catch (error){
    console.log(error)
    alert("Error deleting Lead")
  }
}
//Editing
const editLead=(lead) =>{
  setFormData({
    full_name:lead.full_name,
    phone: lead.phone,
    email: lead.email,
    location: lead.location,
    property_type: lead.property_type,
    system_size: lead.system_size,
    source: lead.source
  })
  seteditId(lead.id)
} 
//change status
const updateStatus = async(id,newStatus) =>{
  try{
    await axios.patch(`http://127.0.0.1:8000/update-status/${id}/`,{
      status:newStatus
    })
    fetchLeads()
  }
  catch (error){
    console.log(error)
    alert("Error Updating Status")
  }
}
//search and filter search
const [search,setSearch] = useState("")
const [statusFilter,setstatusFilter] =useState("")
const filterLeads =leads.filter((lead)=>{
  const matchesSearch = lead.full_name.toLowerCase().includes(search.toLowerCase())
  const matchesStatus=statusFilter === "" ||
  lead.status ===statusFilter
  return matchesSearch && matchesStatus
})
//total leads,won,lost,new
const totalLeads = leads.length
const wonLeads= leads.filter((lead)=>lead.status ==="Won").length
const lostLeads= leads.filter((lead)=>lead.status ==="Lost").length
const newLeads= leads.filter((lead)=>lead.status ==="New Lead").length
  return (

<div className="container mt-5">
  <h1 className="text-primary mb-4">Lead Management System</h1>
  <div className="row mb-4">
    <div className="col-md-3">
      <div className="card text-center p-3 shadow">
        <h5>Total Leads</h5>
        <h2>{totalLeads}</h2>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card text-center p-3 shadow">
       <h5>New Leads</h5> 
       <h2>{newLeads}</h2>
      </div>
      </div>
    <div className="col-md-3">
      <div className="card text-center p-3 shadow">
       <h5>Won Leads</h5> 
       <h2>{wonLeads}</h2>
      </div>
      </div>
      <div className="col-md-3">
      <div className="card text-center p-3 shadow">
       <h5>Lost Leads</h5> 
       <h2>{lostLeads}</h2>
      </div>
      </div>
      
  </div>
  {/* ADD LEAD FORM */}
  <div className="card p-4 mb-5">
    <h3 className="mb-4">Add Lead</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <label className="form-label">Full Name </label>
      <input type="text" className="form-control" name="full_name"
          value={formData.full_name} onChange={handleChange} required/>
      </div>
      <div className="mb-3">
      <label className="form-label">Phone</label>
      <input type="text" className="form-control" name="phone"
          value={formData.phone} onChange={handleChange} required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Email </label>
        <input type="email" className="form-control" name="email"
          value={formData.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input type="text" className="form-control" name="location"
          value={formData.location} onChange={handleChange} required />
          </div>
      <div className="mb-3">
     <label className="form-label">Property Type</label>
     <select className="form-select" name="property_type"
          value={formData.property_type} onChange={handleChange} required>
            <option value="">Select Property Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
      </select>
      </div>
      <div className="mb-3">
        <label className="form-label">System Size (kW)</label>
        <input type="number" className="form-control" name="system_size"
              value={formData.system_size} onChange={handleChange} required
            />
      </div>
      <div className="mb-3">
      <label className="form-label">Source</label>
      <select className="form-select" name="source" value={formData.source}
              onChange={handleChange} required>
        <option value="">Select Source</option>
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Walk-in">Walk-in</option>
        <option value="Social Media">Social Media</option>
        </select>
        </div>
    <button type="submit" className="btn btn-primary">
      {editId ? "Update Lead" : "Add Lead"} </button>
  </form>

</div>
<div className="row mb-4">
  <div className="col-md-6">
    <input type="text" className="form-control" placeholder="Search by name"
      value={search} onChange={(e) => setSearch(e.target.value)}/>
  </div>
  <div className="col-md-6">
    <select className="form-select" value={statusFilter}
    onChange={(e) => setstatusFilter(e.target.value)}>
      <option value="">All Status</option>
      <option value="New Lead">New Lead</option>
      <option value="Contacted">Contacted</option>
      <option value="Site visit scheduled">Site visit scheduled</option>
      <option value="Proposal Sent">Proposal Sent</option>
      <option value="Won">Won</option>
      <option value="Lost">Lost</option>
    </select>
  </div>
</div>
{/* LEADS TABLE */}
 <div className="card p-4">
  <h3 className="mb-4">All Leads</h3>
  <table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Location</th>
        <th>Property</th>
        <th>System Size</th>
        <th>Source</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
      filterLeads.map((lead) => (
      <tr key={lead.id}>
       <td>{lead.full_name}</td>
       <td>{lead.phone}</td>
       <td>{lead.email}</td>          
       <td>{lead.location}</td>
       <td>{lead.property_type}</td>          
       <td>{lead.system_size} kW</td>
       <td>{lead.source}</td>          
       <td><select className="form-select" value={lead.status} 
       onChange={(e)=>updateStatus(lead.id,e.target.value)}>
        <option value="New Lead">New Lead</option>
        <option value="Contacted">Contacted</option>
        <option value="Site visit scheduled">Site visit scheduled</option>
        <option value="Proposal sent">Proposal sent</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option></select></td>
       <td><button className="btn btn-warning btn-sm me-2" onClick={()=>editLead(lead)}>
        Edit</button>
        <button className="btn btn-danger btn-sm" onClick={()=>deleteLead(lead.id)}>
        Delete</button></td>
      </tr>  
      ))
      }
      </tbody>
  </table>
  </div>
</div>
  )
}

export default App
         

                  

                  

                  

                
       
              


          



      

     


        


          

            

            

          

              

            

            

          


        
          


          