const db = require("../data/connection");

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

 function insert(hobbit) {
    return db("hobbits").insert(hobbit, "id");
}

 function update(id, changes) {
    return null;
}

function remove(id) {
    return db('hobbits')
    .where({id})
    .delete()

}

function getAll() {
    return db("hobbits");
}

function findById(id) {
    return null;
}
