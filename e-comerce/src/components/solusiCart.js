let items = [{id: 1, q: 1}, {id: 2, q: 1}];

let cekId = 1

let xxx = items.some(item => {
	return item.id === cekId
})

if(xxx){
  items = items.map(item => {
  	if(item.id === cekId){
      item.q += 1
    }
    return item
  })
}else{
  items.push({
  	id: cekId,
    q : 1
  })
}
console.log(xxx);
console.log(items)
// expected output: true