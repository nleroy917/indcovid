export function parse_data(data) {

    /* Data comes in as a list of objects, and
       it needs to be parsed so that we only
       have the Indiana data.
       //
       Check the "state" attribute of the object
       and store it in new array if it is Indiana
    */
    
    const new_list =  {labels: [],
                      cases: {id: 'Positive', color: "hsl(99, 70%, 50%)", data: []},
                      deaths:{id: 'Deaths', color: "hsl(25, 70%, 50%)", data: []},
                      hosp: {id: 'Hopsitalized', color: "hsl(96, 70%, 50%)", data: []}} //This will be a list of objects

    // Iterate over each data point in the list
    data.forEach(obj => {
        if(obj.state === 'IN'){ // if indiana datapoint
            new_list.labels.push(convert_date(obj.date))
            new_list.cases.data.push(obj.positive ? obj.positive : 0)
            new_list.deaths.data.push(obj.death ? obj.death : 0)
            new_list.hosp.data.push(obj.hospitalizedCurrently ? obj.hospitalizedCurrently : 0)
        } else {
            //pass
        }
    })
    new_list.cases.data.reverse()
    new_list.deaths.data.reverse()
    new_list.hosp.data.reverse()
    return new_list

}

const convert_date = (date) => {
    
    // Set Up
    date = date.toString()
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let date_string = ''

    // Slice and extract
    let year = date.slice(0,4)
    let month = date.slice(4,6)
    month = months[month-1]
    let day = date.slice(6,8)

    date_string = month + ' ' + day + ', ' + year

    return date_string

}


