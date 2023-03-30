'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {

    async create(idUser, favorite) {

        const { Favorite } = this.server.models();
        const { Film } = this.server.models();
        favorite.id_user = idUser;
        // check if user have already this film
        let isAlreadyInFavorite;
        // eslint-disable-next-line prefer-const
        isAlreadyInFavorite = await Favorite.query()
            .where('id_user', favorite.id_user)
            .where('id_film', favorite.id_film);
        if (isAlreadyInFavorite.length !== 0) {
            throw new Error('Error : This film is already in your favorite.');
        }

        let isExisting;
        // eslint-disable-next-line prefer-const
        isExisting = await Film.query()
            .where('id', favorite.id_film);
        if (isExisting.length === 0) {
            throw new Error('Error : This film doesn\'t exist.');
        }

        return Favorite.query().insertAndFetch(favorite);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    async delete(idUser, favorite) {
        const { Favorite } = this.server.models();

        // check if user have already this film
        let isAlreadyExisting;
        // eslint-disable-next-line prefer-const
        isAlreadyExisting = await Favorite.query()
            .where('id_user', idUser)
            .where('id_film', favorite.id_film);
        if (isAlreadyExisting.length === 0) {
            throw new Error('Error : This film is not deletable because it is not in your favorite.');
        }

        return Favorite.query()
            .delete()
            .where('id_user', idUser)
            .where('id_film', favorite.id_film);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    getList(idUser) {
        const { Favorite } = this.server.models();
        const { Film } = this.server.models();

        return Film.query().whereIn(
            'id',
            Favorite.query().select('id_film').where('id_user', idUser)
        );
    }


};
