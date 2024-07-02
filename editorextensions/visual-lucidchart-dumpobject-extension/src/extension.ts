import {
  EditorClient, Menu, MenuType, Viewport, BlockProxy, SimpleImageFillPosition
} from 'lucid-extension-sdk';


const client = new EditorClient();
const menu = new Menu(client);
const viewport = new Viewport(client);

// Action to DumpSelectedObject
client.registerAction('DumpSelectedObject', async () => {
  const currentPage = viewport.getCurrentPage();
  const items = viewport.getSelectedItems(true);
  if (!currentPage) return;
  for (var i = 0; i < items.length; i++) {
    if ((items[i].constructor.name == "BlockProxy") || (items[i].constructor.name == "CustomBlockProxy")) {
      const strConsole = "Block id: " + items[i].id +
        "\n\tfillStyle:" + JSON.stringify(items[i].properties.get('fillStyle')) +
        "\n\tFillColor:" + JSON.stringify(items[i].properties.get('FillColor'));
      client.alert(`Dump: ${strConsole}`);
    }
  }
});

// Action to Add image to selected object
client.registerAction('AddImageToSelectedObject', async () => {
  const currentPage = viewport.getCurrentPage();
  const items = viewport.getSelectedItems(true);
  if (!currentPage) return;
  // The url must refer to resources directory but the file must be in public directory (Very Strange!)
  let imageUrl = "http://localhost:9900/resources/ApplicationIcon.png";
  for (var i = 0; i < items.length; i++) {
    if ((items[i].constructor.name == "BlockProxy") || (items[i].constructor.name == "CustomBlockProxy")) {
      //set image fill this does not work, you need to use FillColor property
      // items[i].properties.set('fillStyle', {
      //   url: imageUrl,
      //   position: SimpleImageFillPosition.Fit       
      // });
      items[i].properties.set('FillColor', {
        url: imageUrl,
        position: SimpleImageFillPosition.Fit
      });
      //  Other way to add an image to a block      
      //      (items[i] as BlockProxy).setFillStyle({url:"http://localhost:9900/resources/LucidSoftwareFavicon.png",position:SimpleImageFillPosition.Fit});        
    }
  }
});

// Action to Add image to selected object
client.registerAction('AddImageToPage', async () => {
  const currentPage = viewport.getCurrentPage();
  if (!currentPage) return;
  currentPage.addImage({
    boundingBox: {
      x: 0, y: 0, w: 150, h: 150
    },
    fillStyle: {
  // The url must refer to resources directory but the file must be in public directory (Very Strange!)
      url: "http://localhost:9900/resources/ApplicationIcon.png",
      position: SimpleImageFillPosition.Fill,
    },
  });
});

menu.addMenuItem({
  label: 'Dump selected objects',
  action: 'DumpSelectedObject',
  menuType: MenuType.Main,
});

menu.addMenuItem({
  label: 'Add image to selected objects',
  action: 'AddImageToSelectedObject',
  menuType: MenuType.Main,
});

menu.addMenuItem({
  label: 'Add image to page',
  action: 'AddImageToPage',
  menuType: MenuType.Main,
});
