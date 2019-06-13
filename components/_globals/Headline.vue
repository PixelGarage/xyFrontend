<script>
  /**
   * Defines a headline with a given tag.
   *
   * A headline wraps every word of the slot in a span, which can be styled with background color.
   */
  const getChildrenTextContent = children => {
    return children.map(node => {
      return node.children ? getChildrenTextContent(node.children) : node.text
    }).join('')
  };

  export default {
    name: 'Headline',
    props: {
      tag: {
        type: String,
        default: 'h2'
      }
    },
    render: function(createElement) {
      // get all words in the slot
      let text = getChildrenTextContent(this.$slots.default);
      const words = text.split(' ');


      // create the headline
      if (words.length) {
        return createElement(
          this.tag,
          {
            class: {
              headline: true,
            }
          },
          words.map(function(word) {
            return createElement(
              'span',
              {
                class: {
                  'headline-inner': true,
                }
              },
              word
            );
          })
        );
      }
      else {
        return createElement(
          this.tag,
          {
            class: {
              headline: true,
            }
          },
          ''
        );
      }
    },
  };
</script>
