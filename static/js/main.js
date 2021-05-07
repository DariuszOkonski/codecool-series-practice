const data_handler = {
    _api_get(url, callback) {
        fetch(url, {
            'Content-type': 'application/javascript'
        })
            .then(respoonse => respoonse.json())
            .then(data => callback(data))
            .catch(err => console.log('ERR: ', err))
    },
    getAllGenres(url, callback) {
        return this._api_get(url, callback)
    },
    getSingleGenre(url, callback) {
        return this._api_get(url, callback)
    }
}

const dom = {
    DOMelements: {
        genresContainer: document.getElementById('genres-container')
    },
    init() {
        this.getAllGenres()
    },
    getAllGenres() {
        data_handler.getAllGenres('/get-genres', (response) => {
            const table = this.createGenresTable(response)
            this.insertToContainer(table)
        })
    },
    getSingleGenre(id) {
        console.log('get single genre: ', id)
        data_handler.getSingleGenre(`/get-genre/${id}`, (response) => {
            console.log(response)
            const div = this.createSingleGenre(response[0])
            this.insertToContainer(div);
        })
    },
    // building methods
    createGenresTable(content) {
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');

            tr.innerHTML = "<th>ID</th><th>Name</th><th>Actions</th>"

            const tbody = document.createElement('tbody')
            content.forEach(element => {
                const tr = document.createElement('tr')
                const td_id = document.createElement('td')
                td_id.innerText = element.id

                const td_name = document.createElement('td')
                td_name.innerText = element.name

                const td_action = document.createElement('td')
                const button_show = document.createElement('button')
                button_show.textContent = 'Show';
                button_show.addEventListener('click', () => {
                    this.getSingleGenre(element.id);
                })
                td_action.appendChild(button_show);

                const button_update = document.createElement('button')
                button_update.textContent = 'Update';
                button_update.addEventListener('click', () => {
                    console.log('button_update: ', element.id)
                })
                td_action.appendChild(button_update);

                const button_delete = document.createElement('button')
                button_delete.textContent = 'Delete';
                button_delete.addEventListener('click', () => {
                    console.log('button_delete: ', element.id)
                })
                td_action.appendChild(button_delete);


                tr.appendChild(td_id)
                tr.appendChild(td_name);
                tr.appendChild(td_action);
                tbody.appendChild(tr);
            })

            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            return table
    },
    createSingleGenre(content) {
        console.log(content);
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <p>And here is a "detailed" kind of genre:</p>
            <div class="row">
                <div class="col col-twothird">
                    <h2>Name: ${content.name}</h2>
                    <h3>ID: ${content.id}</h3>
                </div>
            </div>
        `;

        return div
    },
    insertToContainer(element) {
      this.DOMelements.genresContainer.innerHTML = "";
      this.DOMelements.genresContainer.appendChild(element)
    }
}

dom.init()