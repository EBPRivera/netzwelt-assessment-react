import _ from "lodash";

const insertIntoTerritories = (territories, territory, parentId = null) => {
  let territoriesToPars = {};

  if (
    _.isNull(territory.parent) ||
    (!_.isNull(parentId) &&
      _.isEqual(_.size(parentId), _.size(territory.id) - 2))
  ) {
    territoriesToPars = {
      ...territories,
      [territory.id]: { ...territory, children: {} },
    };
  } else {
    const parent = _.find(territories, (terr, key) =>
      _.startsWith(territory.parent, terr.id)
    );

    territoriesToPars = {
      ...territories,
      [parent.id]: {
        ...parent,
        children: insertIntoTerritories(parent.children, territory, parent.id),
      },
    };
  }

  return territoriesToPars;
};

const parseTerritories = (territories) => {
  let parsedTerritories = [];

  _.map(territories, (territory) => {
    parsedTerritories = insertIntoTerritories(parsedTerritories, territory);
  });

  return parsedTerritories;
};

export default parseTerritories;
