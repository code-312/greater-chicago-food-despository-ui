export const county = {
    id: 'county',
    type: 'fill',
    paint:{
        'fill-color': {
            property: 'rangeValue',
            stops: [
            [0, '#d5f5e3'],
            [1, '#abebc6'],
            [2, '#82e0aa'],
            [3, '#58d68d'],
            [4, '#2ecc71'],
            [5, '#28b463'],
            [6, '#239b56'],
            [7, '#1d8348'],
            [8, '#186a3b']]
        },
        "fill-opacity": 0.5, 
        "fill-outline-color": "#2e86c1"
    }
};

export const selectedCounty = {
    id: 'selected',
    type: 'line',
    paint:{
        "line-opacity": 0.5, 
        "line-color": "#f1c40f",
        "line-width": 5
    }
};

export const zipcode = {
    id: 'zipcode',
    type: 'fill',
    paint:{
        'fill-color': "#5dade2",
        "fill-opacity": 0.3, 
        "fill-outline-color": "#21618c"
    }
}