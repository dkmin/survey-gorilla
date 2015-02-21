(function() {
  'use strict';

  angular
    .module('surveyGorillaApp')
    .service('card', card);

  /* @ngInject */
  function card(Cards, Auth) {
    this.getCard = getCard;
    this.getCards = getCards;
    this.create = create;
    this.remove = remove;
    this.update = update;
    this.memberEnroll = memberEnroll;
    this.memberLeave = memberLeave;
    this.isCardOwner = isCardOwner;

    function getCard(cardId) {
      return Cards.one(cardId).get();
    }

    function getCards(isOnlyMyCard, params) {
      var card;
      if(isOnlyMyCard) {
        card = {type: 'RELATED', sort: '-CREATED'};
      } else {
        card = {type: 'UNRELATED', sort: '-CREATED'}
      }

      if(params) {
        params = angular.extend(card, params);
      } else {
        params = card;
      }

      return Cards.customGET('', params);
    }

    function create(params) {
      return Cards.customPOST(params);
    }

    function remove(cardId) {
      return Cards.one(cardId).customDELETE();
    }

    function update(cardId, params) {
      return Cards.one(cardId).customPUT(params);
    }

    function isCardOwner(card) {
      // if(card && card.owner && Auth.isLoggedIn()) {
      //   return card.owner.id === Auth.getCurrentUser().id;
      // } else {
      //   return false;
      // }
    }
  }
})();