IMAGE_URL="https://cdn2.unrealengine.com/egs-godofwar-santamonicastudio-ic1-400x400-5819bbf696c5.png?h=270&resize=1&w=480"
BACKGROUND_URL="https://wallpaperboat.com/wp-content/uploads/2019/04/rick-and-morty-wallpaper-wallpaper-background-001.jpg"

# curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
npx autocannon --renderStatusCodes -c 500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
