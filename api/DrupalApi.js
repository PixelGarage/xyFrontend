/**
 * Implements specific Drupal JSON API for the application.
 *
 * Example usage:
 *   const api = new DrupalApi(context)
 */
import DrupalApiClient from './DrupalApiClient';

export default class DrupalApi extends DrupalApiClient {
  /**
   * @param {String} uuid
   */
  async findOneRecipeByUuid (uuid) {
    const query = {
      include: 'image,category,image.thumbnail',
      filter: {
        isPublished: {
          path: 'isPublished',
          value: 1
        }
      }
    };
    return await this.get('recipes', query, uuid);
  }

  async findAllPromotedRecipes (limit = 4) {
    const query = {
      page: {
        limit
      },
      filter: {
        isPromoted: {
          path: 'isPromoted',
          value: 1
        },
        isPublished: {
          path: 'isPublished',
          value: 1
        }
      },
      include: 'image,image.thumbnail',
      fields: {
        recipes: 'title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,url'
      },
      sort: '-created'
    };
    return await this.get('recipes', query);
  }

  async findAllRecipesCategories (limit = 20) {
    const query = {
      page: {
        limit
      }
    };
    return await this.get('categories', query);
  }

  async findAllLatestRecipes (limit = 4, offset = 0) {
    const query = {
      sort: '-created',
      page: {
        limit
      },
      include: 'image,image.thumbnail',
      fields: {
        recipes: 'title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,url'
      }
    };
    return this.get('recipes', query);
  }

  async findHomePromotedArticlesAndRecipes (limit) {
    const promotedRecipes = this.get('recipes', {
      page: {
        limit: 3
      },
      filter: {
        isPromoted: {
          path: 'isPromoted',
          value: 1
        },
        isPublished: {
          path: 'isPublished',
          value: 1
        }
      },
      include: 'contentType,image,image.thumbnail',
      fields: {
        recipes: 'contentType,title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,url',
        contentTypes: 'type'
      },
      sort: '-created'
    });
    const promotedArticles = this.get('articles', {
      page: {
        limit: 3
      },
      filter: {
        isPromoted: {
          path: 'isPromoted',
          value: 1
        },
        isPublished: {
          path: 'isPublished',
          value: 1
        }
      },
      include: 'contentType,image,image.thumbnail',
      fields: {
        recipes: 'title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,url',
        contentTypes: 'type'
      },
      sort: '-created'
    });
    return Promise
      .all([promotedRecipes, promotedArticles])
      .then(promisesValues => {
        const data = [
          ...promisesValues[0],
          ...promisesValues[1]
        ].sort((item1, item2) => item1.createdAt > item2.createdAt).slice(0, limit);
        return data;
      });
  }

  async findAllRecipesByCategoryName (categoryName, limit = 4, offset = 0) {
    const query = {
      sort: '-created',
      include: 'image,image.thumbnail',
      filter: {
        categoryName: {
          condition: {
            path: 'category.name',
            value: categoryName
          }
        }
      },
      fields: {
        recipes: 'title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,url'
      },
      page: {
        offset: 0,
        limit: limit
      }
    };
    return await this.get('recipes', query);
  }

  async findAllRecipesByDifficultyName (difficultyName, limit = 4, offset = 0) {
    const query = {
      sort: '-created',
      include: 'image,image.thumbnail',
      filter: {
        difficulty: {
          path: 'difficulty',
          value: difficultyName
        }
      },
      fields: {
        recipes: 'title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,url'
      },
      page: {
        offset: 0,
        limit: limit
      }
    };
    return await this.get('recipes', query);
  }

  async findAllRecipesByMaxTotalTime (maxTotalTime, limit = 4, offset = 0) {
    const query = {
      sort: '-created',
      include: 'image,image.thumbnail',
      filter: {
        totalTime: {
          condition: {
            path: 'totalTime',
            value: maxTotalTime,
            operator: '<'
          }
        }
      },
      fields: {
        recipes: 'title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,url'
      },
      page: {
        offset: 0,
        limit: limit
      }
    };
    return await this.get('recipes', query);
  }
}
