
    create(){
      axios.post(`${baseurl}/userapprove`,{
        username : this.username,
        password : this.password,
        role : this.role
      },{
        headers : {
          Authorization : token
        }
      })
      .then(response =>{
        console.log(response.data.message,response.data.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    create_items(){
      let formdata = new FormData()
      formdata.append("item_names",this.item_names)
      formdata.append("quantity",this.quantity)
      formdata.append("description",this.description)
      formdata.append("categoryId",this.category_items)
      formdata.append("cost",this.cost)
      formdata.append("image",document.getElementById("image").files[0])
      axios.post(`${baseUrl}/item`,formdata,{
        headers:{
          Authorization:token
        }
      })
      .then(response => {
        console.log(response.data.data)
        this.item.push(response.data.data)
        this.item_names = ''
        this.quantity = ''
        this.description = ''
        this.category_items = ''
        this.cost = ''
        this.image = ''
      })
      .catch(err => {
        console.log(err)
      })
    },

    create_category(){
      axios.post(`${baseUrl}/category`,{
        category : this.category_name
      },{
        headers:{
          Authorization : token
        }
      })
      .then(response => {
        console.log(response.data.data)
        this.Allcategory.push(response.data.data)
        this.category_name = ''
      })
      .catch(err => {
        console.log(err)
      })
    },

    getallCategory(){
      axios.get(`${baseUrl}/category`)
      .then(response =>{
        console.log(response.data.data)
        this.Allcategory = response.data.data

      })
      .catch(err => {
        console.log(err)
      })
    },

    getAllitem(){
      axios.get(`${baseUrl}/item`)
      .then(response =>{
        console.log(response.data.data)
        this.item = response.data.data
      })
      .catch(err => {
        console.log(err)
      })
    },

    removeItem(id){
      console.log(id)
      console.log(this.item)
      let i = this.item.findIndex(item => item._id == id)
      return this.item.splice(i,1)
    }