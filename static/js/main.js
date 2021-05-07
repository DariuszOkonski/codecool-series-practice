const data_handler = {
    _api_get(url, callback){
        fetch(url, {
            'Content-type': 'application/javascript'
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                callback(data)
            })
    },
    loadActors(url, callback) {
        this._api_get(url, callback)
    }
}

const dom = {
    domElements: {
        divActors: document.getElementById('actors')
    },
    init() {
        this.showActors()
    },
    showActors() {
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Biography</th>
                <th>Action</th>
            </tr>
        `;
        const tbody = document.createElement('tbody')

        data_handler.loadActors('/get-actors', (actors) => {
            actors.forEach(actor => {
                console.log(actor.name)

                let tr = document.createElement('tr')
                let td_id = document.createElement('td')
                let td_name = document.createElement('td')
                let td_biography = document.createElement('td')

                td_id.innerText = actor.id
                td_name.innerText = actor.name
                td_biography.innerText = actor.biography

                tr.appendChild(td_id);
                tr.appendChild(td_name);
                tr.appendChild(td_biography)

                tbody.appendChild(tr);
            })
        })

        table.appendChild(thead);
        table.appendChild(tbody);
        this.domElements.divActors.appendChild(table);
    }

}


dom.init()