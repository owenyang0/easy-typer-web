const blogPluginExports = require('@docusaurus/plugin-content-blog');

const blogPlugin = blogPluginExports.default;

/*
* This plugin enhances the default '@docusaurus/plugin-content-blog' plugin with `tags` added to `globalData`.
* `tags` are later consumed in `src/theme/BlogListPage`.
*/
function blogPluginEnhanced(context, options) {
  const blogPluginInstance = blogPlugin(context, options);

  return {
    ...blogPluginInstance,

    async contentLoaded(...contentLoadedArgs) {
      await blogPluginInstance.contentLoaded(...contentLoadedArgs);
      const { actions, content } = contentLoadedArgs[0];
      const { setGlobalData } = actions;
      const { blogTags } = content;
      setGlobalData({tags: blogTags});	
    }
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced
};

