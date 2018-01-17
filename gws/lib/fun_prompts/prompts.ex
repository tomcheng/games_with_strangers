defmodule FunPrompts.Prompts do
  @prompts [
    %{
      x: false,
      prompt: "A weird thing for the letters in your alphabet soup to suddenly spell out"
    },
    %{x: false, prompt: "A great prank to play on a pizza delivery guy"},
    %{
      x: false,
      prompt: "The most surprising thing you could find in the glove box of a rental car"
    },
    %{x: false, prompt: "Four-leaf clovers are lucky. But if you find a five-leaf clover..."},
    %{x: false, prompt: "The only job you would do for free"},
    %{x: false, prompt: "The most German-sounding word you can invent"},
    %{x: false, prompt: "The worst name for a country music singer"},
    %{x: false, prompt: "It would be really weird to have a bobblehead doll of <BLANK>"},
    %{x: false, prompt: "If you can\u2019t say anything nice..."},
    %{x: false, prompt: "The title of Bob Saget\u2019s biopic"},
    %{x: false, prompt: "The perfect time to wear stilts"},
    %{
      x: false,
      prompt:
        "Little-known fact: In a lifetime, the average person will <BLANK> over 1,000 times while sleeping"
    },
    %{x: false, prompt: "A rejected name for tater tots"},
    %{x: false, prompt: "On the seventh day, God rested. On the eighth day, he <BLANK>"},
    %{x: false, prompt: "A weird reason to have your car recalled"},
    %{x: false, prompt: "You should always wear a helmet when <BLANK>"},
    %{
      x: false,
      prompt:
        "Few remember Michelangelo\u2019s <i>Mona Lisa 2<\/i> which was a painting of <BLANK>"
    },
    %{x: false, prompt: "Something a kangaroo might search for on Google"},
    %{x: false, prompt: "A bad substitute for a surfboard"},
    %{x: false, prompt: "Where would you live if you were two inches tall?"},
    %{
      x: false,
      prompt: "What to do when a really tall person sits in front of you at the movie theater"
    },
    %{x: false, prompt: "An entry in teenage Tarzan\u2019s diary: \u201cToday, I <BLANK>\u201d"},
    %{x: false, prompt: "The absolute best place to hide your house key"},
    %{x: false, prompt: "A strange place to go to while wearing a ski mask"},
    %{x: false, prompt: "What those giant Easter Island heads are thinking"},
    %{x: false, prompt: "So, how do you like it?"},
    %{
      x: false,
      prompt: "What ruined Hannibal \u201cThe Cannibal\u201d Lecter\u2019s credit score?"
    },
    %{x: false, prompt: "What the lamest Transformer would morph into"},
    %{
      x: false,
      prompt:
        "You would gladly give money to someone on the street if they asked \u201cCan you spare some change so I can <BLANK>?\u201d"
    },
    %{
      x: false,
      prompt:
        "SPOILER ALERT: The big plot twist in <i>The Sisterhood of the Traveling Pants 7<\/i> is that the pants <BLANK>"
    },
    %{x: false, prompt: "You know you\u2019re a spoiled brat when your tree house has a <BLANK>"},
    %{x: false, prompt: "What King Kong is most self-conscious about"},
    %{x: false, prompt: "The only reason to ever play a banjo"},
    %{x: false, prompt: "The big conspiracy that nobody even suspects is <BLANK>"},
    %{x: false, prompt: "How Jonah passed the time stuck inside a giant fish"},
    %{x: false, prompt: "Something that the Keebler Elves chant during a strike"},
    %{x: false, prompt: "The title of the most popular TV show in North Korea, probably"},
    %{x: false, prompt: "A quick way to annoy Pat Sajak while playing <i>Wheel of Fortune<\/i>"},
    %{
      x: false,
      prompt: "The title of a National Public Radio show that would put you to sleep the quickest"
    },
    %{x: false, prompt: "Where the missing sock in the dryer ends up going"},
    %{x: false, prompt: "The worst part about being seven feet tall"},
    %{x: false, prompt: "A really weird protest sign would be \u201cEnd <BLANK> Now!\u201d"},
    %{x: false, prompt: "How you can tell your new, all-vegetable diet is working"},
    %{
      x: false,
      prompt:
        "If Cap\u2019n Crunch ever gets court-martialed, it\u2019ll probably be because he..."
    },
    %{x: false, prompt: "Where in the world is Carmen Sandiego? "},
    %{x: false, prompt: "The name of a band in which every member plays the spoons"},
    %{x: false, prompt: "A little-known use for ear wax"},
    %{x: false, prompt: "The type of life they\u2019ll probably find on Mars"},
    %{x: false, prompt: "The name of a board game for players age 70 & older "},
    %{
      x: false,
      prompt:
        "Bob the Builder probably wouldn\u2019t be as popular with children if he were Bob the <BLANK>"
    },
    %{x: false, prompt: "The worst thing to do when a bear is right next to you"},
    %{
      x: false,
      prompt:
        "Unlike \u201cMaverick\u201d or \u201cIceman,\u201d a really bad Air Force fighter pilot name would be <BLANK>"
    },
    %{
      x: false,
      prompt:
        "It would\u2019ve been a much different movie if instead of \u201cPhone home,\u201d E.T. kept saying, \u201c<BLANK>\u201d"
    },
    %{x: false, prompt: "A weird way to dry your hair"},
    %{x: false, prompt: "A new name for the U.S. Congress "},
    %{x: false, prompt: "What Adam thought when he first met Eve"},
    %{x: false, prompt: "What do ceramic garden gnomes do at night?"},
    %{
      x: false,
      prompt: "A mystery that Sherlock Holmes could never solve: The Case of the <BLANK>"
    },
    %{x: false, prompt: "The real secret to a happy marriage is..."},
    %{x: false, prompt: "A rejected name for the game Yahtzee"},
    %{x: false, prompt: "The best thing to blurt out in order to ruin a beautiful sunset"},
    %{x: false, prompt: "A mobster\u2019s pet peeve"},
    %{
      x: false,
      prompt:
        "You know you\u2019re comfortable in a relationship when you ask your significant other to <BLANK>"
    },
    %{x: false, prompt: "The best line to say when you come out of a 10-year coma "},
    %{x: false, prompt: "The real reason Mr. Clean is grinning"},
    %{x: false, prompt: "The best name to give an ugly baby"},
    %{x: false, prompt: "The first thing Abraham Lincoln would do if he came back from the dead"},
    %{
      x: false,
      prompt: "Come up with a <i>TMZ<\/i> celebrity headline from five years in the future"
    },
    %{
      x: false,
      prompt:
        "What the roller coaster attendant is actually saying during his mumbled preamble before the ride"
    },
    %{x: false, prompt: "An ad slogan for cardboard: \u201cNow with more <BLANK>\u201d "},
    %{x: false, prompt: "The most annoying person in a movie theater would <BLANK>"},
    %{x: false, prompt: "A rejected Monopoly game piece "},
    %{x: false, prompt: "A terrible sign-off line for a newscaster"},
    %{x: false, prompt: "A good sign that you may be a ghost"},
    %{
      x: false,
      prompt: "The creepiest thing to whisper in somebody\u2019s ear as you\u2019re hugging them"
    },
    %{x: false, prompt: "A better name for the ukulele"},
    %{x: false, prompt: "What happens when Wile E. Coyote finally catches The Road Runner?"},
    %{
      x: false,
      prompt: "What the Queen\u2019s Guard is secretly thinking as they just stand there"
    },
    %{x: false, prompt: "The worst part about having a mustache"},
    %{
      x: true,
      prompt: "An awkward thing to hear from the person pooping in the bathroom stall next to you"
    },
    %{x: false, prompt: "A quick way to save money on grocery bills"},
    %{
      x: false,
      prompt: "A good sign you\u2019re never going to be a professional football player"
    },
    %{x: false, prompt: "The worst Viking: Eric the <BLANK>"},
    %{x: false, prompt: "How they really select the next Pope"},
    %{x: false, prompt: "The name of a new cologne inspired by celebrity chef Guy Fieri"},
    %{x: false, prompt: "A great way to quickly get out of credit card debt"},
    %{x: false, prompt: "The worst upstairs neighbors would be people that <BLANK>"},
    %{x: false, prompt: "The weirdest message your cat could write out to you in its litter box"},
    %{x: false, prompt: "A good nickname for your abs"},
    %{
      x: false,
      prompt: "The lesser-known sequel to <i>Old Yeller<\/i>: <i>Old Yeller 2: <BLANK><\/i>"
    },
    %{x: false, prompt: "A horrible pick-up line"},
    %{x: false, prompt: "The best way to keep a co-worker from stealing your lunch"},
    %{x: false, prompt: "The least scary horror movie: <i>Night of the <BLANK><\/i>"},
    %{x: false, prompt: "The worst thing to find when you move into a new house"},
    %{x: false, prompt: "The worst carnival prize you could win"},
    %{x: false, prompt: "The most unusual environmental cause is \u201c<BLANK> the Whales\u201d"},
    %{
      x: false,
      prompt:
        "The only thing worse than standing in a really long line is standing in a really long line for <BLANK>"
    },
    %{x: false, prompt: "You wake up 100 years in the future and are shocked to find <BLANK>"},
    %{x: false, prompt: "A weird thing for a preacher to say to end every sermon"},
    %{
      x: false,
      prompt: "A rejected tourism slogan for Des Moines, Iowa: \u201cHome of the <BLANK>\u201d"
    },
    %{
      x: false,
      prompt:
        "A forgotten book in the classic Harry Potter series: <i>Harry Potter and the <BLANK><\/i>"
    },
    %{x: false, prompt: "The weirdest thing a restroom attendant could offer you"},
    %{x: false, prompt: "The worst Thanksgiving Day balloon would be a giant, inflatable <BLANK>"},
    %{
      x: false,
      prompt:
        "The big, crazy twist at the end of the next M. Night Shamalayan movie: He was <BLANK> the whole time!"
    },
    %{
      x: false,
      prompt:
        "Most people know it as The Big Apple, but a lesser-known nickname for New York is The Big <BLANK>"
    },
    %{x: false, prompt: "The next best thing to chew when you\u2019re out of gum"},
    %{
      x: false,
      prompt:
        "You know you\u2019re in a very weird fast food restaurant when the cashier asks, \u201cDo you want <BLANK> with that?\u201d"
    },
    %{
      x: false,
      prompt: "It\u2019s not the heat. It\u2019s not the humidity. It\u2019s the <BLANK>"
    },
    %{x: false, prompt: "It\u2019s incredibly rude to <BLANK> with your mouth open"},
    %{x: false, prompt: "You never have a <BLANK> when you need one"},
    %{
      x: false,
      prompt:
        "<i>The Empire Strikes Back<\/i> would\u2019ve been ruined if Darth Vader said \u201cLuke, I am <BLANK>\u201d"
    },
    %{x: false, prompt: "The worst 1960s teen movie was definitely <i><BLANK> Beach<\/i>"},
    %{x: false, prompt: "The most disgusting breakfast cereal: <BLANK> Flakes"},
    %{x: false, prompt: "In the next big sports scandal, we\u2019ll find out that <BLANK>"},
    %{
      x: false,
      prompt: "Worse than global warming, the real threat to humanity is global <BLANK>"
    },
    %{x: false, prompt: "Forget dogs. What is really man\u2019s best friend?"},
    %{x: false, prompt: "How you can tell it\u2019s a doctor\u2019s first day on the job"},
    %{x: false, prompt: "The worst name for an all-girl band"},
    %{x: false, prompt: "A bad thing to say to your date\u2019s parents"},
    %{x: false, prompt: "Pitch the worst video game idea in five words or less"},
    %{x: false, prompt: "How embarrassing for you. You just <BLANK>"},
    %{x: false, prompt: "The worst mistake you could make while streaming on Twitch.tv"},
    %{x: false, prompt: "The worst song to do pairs figure skating to"},
    %{x: false, prompt: "What landed you in the emergency room this time?"},
    %{x: false, prompt: "The worst thing to say during a job interview"},
    %{x: false, prompt: "A magazine category that hasn\u2019t been invented yet"},
    %{x: false, prompt: "The top 3 ingredients in garbage truck juice"},
    %{x: false, prompt: "A really bad superhero power"},
    %{x: false, prompt: "The worst thing to put on a pizza"},
    %{
      x: false,
      prompt: "If evolution is true, then why hasn\u2019t <BLANK> evolved into <BLANK>?"
    },
    %{x: false, prompt: "R2D2\u2019s biggest complaint"},
    %{x: false, prompt: "Come up with a bad tourism slogan for the Old Faithful geyser"},
    %{x: false, prompt: "The worst possible choice for the person on the new $20 bill"},
    %{
      x: false,
      prompt: "A little-known lyric in the original draft of the \u201cStar-Spangled Banner\u201d"
    },
    %{x: false, prompt: "The best thing to shoot out of a cannon"},
    %{
      x: false,
      prompt: "The winners on <i>The Bachelor<\/i> get a rose. The losers should get <BLANK>"
    },
    %{
      x: false,
      prompt:
        "From the creators of \u201cWhack-a-Mole\u201d comes the new game \u201c<BLANK>-a-<BLANK>\u201d"
    },
    %{x: false, prompt: "The title of a never-released Jimmy Buffett song"},
    %{
      x: false,
      prompt: "The worst thing to hear from your GPS: \u201cIn two miles, <BLANK>\u201d"
    },
    %{x: false, prompt: "The weirdest sentence a judge could impose"},
    %{x: false, prompt: "A good use for toenail clippings"},
    %{x: false, prompt: "A fitting punishment for people who double-dip their chips"},
    %{
      x: false,
      prompt: "America\u2019s energy crisis would be over if we made cars that ran on <BLANK>"
    },
    %{x: false, prompt: "Something it\u2019d be fun to watch ride an escalator "},
    %{
      x: false,
      prompt: "A high school superlative you don\u2019t want to win: Most Likely To <BLANK>"
    },
    %{x: false, prompt: "A rejected title for <i>Moby Dick<\/i>"},
    %{x: false, prompt: "Something you do not want to find under your hotel bed"},
    %{
      x: false,
      prompt:
        "You know your doctor has gone insane when he tells you to make sure you <BLANK> at least once a day"
    },
    %{x: false, prompt: "The worst part about being a Teenage Mutant Ninja Turtle"},
    %{x: false, prompt: "A sign that your kid isn\u2019t good at sports"},
    %{x: false, prompt: "The first sign that you\u2019re no longer cool"},
    %{
      x: false,
      prompt:
        "A video sure to get over 150 million views on YouTube would be \u201cChickens <BLANK>\u201d"
    },
    %{x: false, prompt: "A surprising thing to find stuck to the bottom of your shoe"},
    %{x: false, prompt: "The worst thing that could follow \u201cHoney-Roasted\u201d"},
    %{x: false, prompt: "Why are geese such jerks?"},
    %{x: false, prompt: "A sign that you\u2019re a bad teacher"},
    %{x: false, prompt: "The worst breakfast: pancakes shaped like <BLANK>"},
    %{x: false, prompt: "What bears dream about all winter"},
    %{x: false, prompt: "A good sign that you\u2019ve drunk too much Mt. Dew"},
    %{x: false, prompt: "What\u2019s in the box? WHAT\u2019S  IN THE BOX?!"},
    %{x: false, prompt: "The manliest way to start a conversation"},
    %{x: false, prompt: "What the abominable snowman does when he\u2019s bored"},
    %{x: false, prompt: "A good alternative for ping-pong paddles"},
    %{x: false, prompt: "You know you\u2019re a chocoholic when..."},
    %{x: false, prompt: "The worst reason to use a time machine"},
    %{x: false, prompt: "Something you should not do while crowdsurfing"},
    %{x: false, prompt: "What those bolts in Frankenstein\u2019s neck are for"},
    %{
      x: false,
      prompt: "What Waldo from \u201cWhere\u2019s Waldo?\u201d says to himself in the mirror"
    },
    %{x: false, prompt: "The worst road trip would start with someone <BLANK>"},
    %{x: false, prompt: "A creepy thing to write in your email signature line"},
    %{x: false, prompt: "The only five words in your obituary in the newspaper"},
    %{x: false, prompt: "What\u2019s the U.S. government really hiding in Area 51?"},
    %{x: false, prompt: "The worst advice an IT guy could give"},
    %{x: false, prompt: "A really bad name for an apartment complex: \u201c<BLANK> Place\u201d"},
    %{
      x: false,
      prompt: "What should we do with all of that plastic that won\u2019t disintegrate?"
    },
    %{x: false, prompt: "One thing that the rich truly enjoy is diamond-encrusted <BLANK>"},
    %{x: false, prompt: "The best part of turning 100 years old"},
    %{
      x: false,
      prompt: "The lesser-known other way to find the Wizard of Oz: Follow the <BLANK> Road"
    },
    %{x: false, prompt: "Forget coffee. Don\u2019t talk to me until I\u2019ve had my <BLANK>"},
    %{
      x: false,
      prompt: "Odd new shampoo instructions: \u201cLather, Rinse, <BLANK>, Repeat.\u201d"
    },
    %{x: false, prompt: "The worst magic trick"},
    %{x: false, prompt: "The lost Hemingway book: <i>The Old Man and the <BLANK><\/i>"},
    %{x: false, prompt: "The title of a podcast you would never ever listen to"},
    %{x: false, prompt: "The name of a new, terrifying species of spider"},
    %{x: false, prompt: "The most annoying co-worker would constantly <BLANK>"},
    %{x: false, prompt: "A surefire way to ruin Christmas"},
    %{x: false, prompt: "The name of the worst baby doll"},
    %{x: false, prompt: "\u201cDon\u2019t blame me, I voted for <BLANK>.\u201d"},
    %{x: false, prompt: "The name of a fast food restaurant in the Stone Age"},
    %{x: false, prompt: "Dodgeball would be an even better sport if <BLANK> were allowed"},
    %{x: false, prompt: "A <BLANK> a day keeps the doctor away"},
    %{
      x: false,
      prompt:
        "What is the Abraham Lincoln statue thinking while he\u2019s sitting there in the Lincoln Memorial?"
    },
    %{
      x: false,
      prompt:
        "Instead of \u201cCheese!\u201d the worst family photographer would tell you to say, \u201c<BLANK>!\u201d"
    },
    %{
      x: false,
      prompt: "The title of a college admission essay that would definitely get rejected"
    },
    %{x: false, prompt: "Something Big Bird will confess on his deathbed"},
    %{
      x: false,
      prompt: "What you would expect Justin Bieber\u2019s line of fragrances to smell like"
    },
    %{x: false, prompt: "The last thing you\u2019d want to find in your air ducts"},
    %{x: false, prompt: "The worst college football team: The Fighting <BLANK>"},
    %{x: false, prompt: "A terrible name for a dragon"},
    %{
      x: false,
      prompt: "In the future, moviegoers will flock to see <i>Jurassic Park 10: <BLANK><\/i>"
    },
    %{x: false, prompt: "The worst way to unclog a toilet"},
    %{
      x: false,
      prompt:
        "Something that\u2019s been hiding in the background in every episode of <i>Friends<\/i>"
    },
    %{x: false, prompt: "We should combine Minnesota and Wisconsin and call them <BLANK>"},
    %{x: false, prompt: "The name of a cable network that no one watches"},
    %{
      x: false,
      prompt:
        "If the groundhog \u201ckind of\u201d sees his shadow, it\u2019s six weeks of <BLANK>"
    },
    %{x: false, prompt: "What\u2019s really destroying the ozone layer?"},
    %{x: false, prompt: "You know you\u2019re famous when..."},
    %{x: false, prompt: "The absolute worst moment for a bird to poop on you"},
    %{x: false, prompt: "A weird thing for someone to frame and hang on the wall"},
    %{x: false, prompt: "The best thing to yell while going over Niagara Falls in a barrel "},
    %{
      x: false,
      prompt:
        "What you don\u2019t want to hear from the passenger next to you at the start of a 20-hour flight"
    },
    %{x: false, prompt: "Why ducks really fly south in the winter"},
    %{x: false, prompt: "Where Charlie Brown winds up at age 45"},
    %{x: false, prompt: "What a frog would say to his psychiatrist"},
    %{x: false, prompt: "What is the Loch Ness Monster, really?"},
    %{x: false, prompt: "The Pyramids would be even more impressive if they contained <BLANK>"},
    %{x: false, prompt: "What Sam Elliott probably nicknames his mustache"},
    %{x: false, prompt: "The worst theme for your kid\u2019s first dance recital"},
    %{
      x: false,
      prompt:
        "The worst combination of two actors that could possibly star in the next season of <i>True Detective<\/i> together"
    },
    %{
      x: false,
      prompt:
        "It\u2019s disappointing to put together a 1,000 piece puzzle and realize it\u2019s just a picture of <BLANK>"
    },
    %{x: false, prompt: "The name of a law firm you shouldn\u2019t hire"},
    %{x: false, prompt: "The worst thing to find frozen in an ice cube"},
    %{x: false, prompt: "Something you don\u2019t expect to see when you spy on your neighbors"},
    %{x: false, prompt: "An experiment mice actually like having performed on them"},
    %{
      x: false,
      prompt: "A double rainbow doesn\u2019t have gold at the end of it. Instead, it has <BLANK>"
    },
    %{
      x: false,
      prompt:
        "The best shirt to wear next to somebody who\u2019s wearing an \u201cI\u2019m with stupid\u201d T-shirt"
    },
    %{
      x: false,
      prompt:
        "The worst thing a plastic surgeon could say after he botched your surgery: \u201cI\u2019m sorry, I accidentally <BLANK>\u201d"
    },
    %{x: false, prompt: "The worst advice your boxing coach could give you"},
    %{x: false, prompt: "What an alarm clock could say that would wake you right up"},
    %{
      x: false,
      prompt:
        "A weird thing to hear from your doctor: \u201cI\u2019m afraid you have <BLANK>\u201d"
    },
    %{
      x: false,
      prompt: "In a shocking poll, it was discovered that three out of four Americans <BLANK>"
    },
    %{
      x: false,
      prompt: "The most common thing you\u2019d hear if you could read people\u2019s thoughts"
    },
    %{x: false, prompt: "The name of a hairstyle that will never catch on"},
    %{x: false, prompt: "A bad name for an Italian restaurant"},
    %{x: false, prompt: "A realistic, honest fast-food slogan"},
    %{x: false, prompt: "A good sign that you\u2019ve drunk too much Mt. Dew"},
    %{x: false, prompt: "What bears dream about all winter"},
    %{x: false, prompt: "The worst breakfast: pancakes shaped like <BLANK>"},
    %{x: false, prompt: "A sign that you\u2019re a bad teacher"},
    %{
      x: false,
      prompt:
        "If a genie gives you three wishes, the best things to wish for are: 1) a billion dollars, 2) eternal life, and 3) <BLANK>"
    },
    %{x: false, prompt: "The worst charity: Save the <BLANK>"},
    %{
      x: false,
      prompt:
        "Little-known fact: An unaired episode of <i>The Brady Bunch<\/i> had the family dealing with <BLANK>"
    },
    %{x: false, prompt: "The futuristic invention you can\u2019t wait to see exist"},
    %{x: false, prompt: "What\u2019s really at the center of the Earth?"},
    %{
      x: false,
      prompt: "Invent a new word for the toilet that sounds like it\u2019s from Shakespeare"
    },
    %{x: false, prompt: "Safety tip! Don\u2019t eat a half hour before you <BLANK>"},
    %{x: false, prompt: "The real way you can tell an alligator from a crocodile"},
    %{x: false, prompt: "A very unnecessary surgery"},
    %{x: false, prompt: "Survival tip! Start a fire by rubbing <BLANK>"},
    %{x: false, prompt: "Helpful advice you would give to Super Mario"},
    %{
      x: false,
      prompt: "In the future, scientists discover that the secret to eternal youth is <BLANK>"
    },
    %{x: false, prompt: "Something you shouldn\u2019t use a chainsaw for"},
    %{x: false, prompt: "A surprising purchase on Willy Wonka\u2019s credit card statement"},
    %{x: false, prompt: "The worst album: \u201c<BLANK> Sings the Blues\u201d"},
    %{
      x: false,
      prompt:
        "A really stupid idea for a phone app (that would still make you millions of dollars)"
    },
    %{x: false, prompt: "The name of a new game show that sounds terrible"},
    %{x: false, prompt: "The one thing you wish a politician would just say already"},
    %{x: false, prompt: "A secret way to get stubborn ketchup out of the bottle"},
    %{x: false, prompt: "The most surprising person to admit to being the Zodiac Killer"},
    %{x: false, prompt: "A lesson that probably wouldn\u2019t be taught on <i>Sesame Street<\/i>"},
    %{x: false, prompt: "Something you promise to yell if you win this game"},
    %{x: false, prompt: "A creepy thing to find scribbled onto a dollar bill"},
    %{
      x: false,
      prompt: "If you don\u2019t have extra money, an odd thing to use as a tip for your waiter"
    },
    %{x: false, prompt: "The name of the next hot boy band"},
    %{x: false, prompt: "A terrible name for a king"},
    %{x: false, prompt: "A sure sign that a drifter has been secretly living in your house"},
    %{x: false, prompt: "The name of a new U.S. state you would never visit"},
    %{x: false, prompt: "The one thing that isn\u2019t better dipped in chocolate"},
    %{
      x: false,
      prompt:
        "Like \u201cdinger,\u201d \u201cgrand salami,\u201d and \u201cjack,\u201d come up with a new slang term for a home run in baseball"
    },
    %{x: false, prompt: "A terrible vacation idea: going to visit The Museum of <BLANK>"},
    %{x: false, prompt: "A great gag gift would be an exploding <BLANK>"},
    %{x: false, prompt: "The official medical term for belly button lint (probably)"},
    %{x: false, prompt: "A surprising thing to hear in a nature documentary"},
    %{
      x: false,
      prompt: "The years 2011 to 2020 will be remembered as \u201cThe <BLANK> Age\u201d"
    },
    %{x: false, prompt: "An inventive way to get rid of head lice"},
    %{
      x: false,
      prompt: "Little-known fact: the scariest animal in the world is the <BLANK> cobra"
    },
    %{x: false, prompt: "A bad name for a brand of hot sauce"},
    %{x: false, prompt: "An excuse to avoid riding the mechanical bull"},
    %{x: false, prompt: "What Big Foot complains about to his therapist the most"},
    %{x: false, prompt: "The worst warning to read on some medicine you just swallowed"},
    %{x: false, prompt: "A strange poster to hang in a college dorm room"},
    %{x: false, prompt: "Never pay more than $3 for <BLANK>"},
    %{x: false, prompt: "The name of a really bizarre diet that just never caught on"},
    %{x: false, prompt: "The most popular T-shirt slogan in Mississippi, probably"},
    %{x: false, prompt: "The hit song from the Broadway show <i>Fart: The Musical<\/i>"},
    %{
      x: false,
      prompt: "A ridiculous government agency that no one knows about: The Department of <BLANK>"
    },
    %{x: false, prompt: "The best thing about being thrown into a volcano"},
    %{x: false, prompt: "The world\u2019s most boring video game"},
    %{
      x: false,
      prompt: "New requirement at amusement parks: \u201cYou must be this <BLANK> to ride\""
    },
    %{x: false, prompt: "You probably shouldn\u2019t hire a moving company called <BLANK>"},
    %{x: false, prompt: "The weirdest combination of three items that you could buy at the store"},
    %{x: false, prompt: "The worst halftime show: The <BLANK> Dancers"},
    %{x: false, prompt: "What\u2019s really in a camel\u2019s hump?"},
    %{x: false, prompt: "The most obnoxious name someone could give their kid"},
    %{
      x: false,
      prompt: "Something that is probably on Nicolas Cage\u2019s \u201cTo Do\u201d list"
    },
    %{x: false, prompt: "The newest health food: <BLANK> juice"},
    %{
      x: false,
      prompt:
        "HR would probably get the most complaints on \u201cBring your <BLANK> to work\u201d day"
    },
    %{x: false, prompt: "A lesser-known Knight of the Round Table: Sir <BLANK>"},
    %{x: false, prompt: "A Socrates quote that nobody bothered to write down"},
    %{x: false, prompt: "Why is the sky blue?"},
    %{x: false, prompt: "The best way to catch a leprechaun"},
    %{x: false, prompt: "The worst things to juggle"},
    %{x: false, prompt: "Turns out, the meaning of life is <BLANK>"},
    %{x: false, prompt: "The worst tattoo to have on your forehead"},
    %{x: false, prompt: "A mean text you would send to break up with a Muppet"},
    %{x: false, prompt: "What really cracked the Liberty Bell?"},
    %{x: false, prompt: "A weird photo to keep in your wallet"},
    %{x: false, prompt: "An odd painting to hang above your bed"},
    %{x: false, prompt: "A poor substitute for a necktie"},
    %{x: false, prompt: "The perfect day off is just twelve straight hours of <BLANK>"},
    %{x: false, prompt: "The worst Vegas casino: <BLANK> Palace"},
    %{x: false, prompt: "Something awful to hold in your mouth for an hour"},
    %{x: false, prompt: "A great way to start a conversation with a weird loner on the subway"},
    %{x: false, prompt: "A hip, new advertising slogan for socks"},
    %{x: false, prompt: "Really awful cheerleaders would yell \u201c<BLANK>!\u201d"},
    %{x: false, prompt: "Why should you never turn your back on a penguin?"},
    %{x: false, prompt: "The reason Pluto isn\u2019t a planet anymore"},
    %{x: false, prompt: "The biggest issue facing the town of Margaritaville "},
    %{x: false, prompt: "The least appetizing name for a restaurant"},
    %{x: false, prompt: "Something you should not say in front of a parrot"},
    %{x: false, prompt: "Something you should not put in your kid\u2019s sandbox"},
    %{x: false, prompt: "What the boogeyman is afraid of"},
    %{x: false, prompt: "A bad name for a hospital"},
    %{x: false, prompt: "Something you do not want to do while standing in a police lineup"},
    %{x: false, prompt: "Where\u2019s Jimmy Hoffa? "},
    %{x: false, prompt: "An odd casting choice would be Clint Eastwood as <BLANK>"},
    %{
      x: false,
      prompt: "After the Heimlich Maneuver, the second-best way to stop someone from choking"
    },
    %{
      x: false,
      prompt:
        "A rejected safety technique for when you catch fire was to \u201cstop, drop, and <BLANK>\u201d"
    },
    %{x: false, prompt: "The difference between Grade A beef and Grade B beef"},
    %{
      x: false,
      prompt:
        "The weirdest room you could see in an airport would be one specifically designated for <BLANK>"
    },
    %{
      x: false,
      prompt:
        "If you really want to impress the Olympic diving judges, try a dive that involves <BLANK>"
    },
    %{x: false, prompt: "What you think the word \u201cpandiculation\u201d means"},
    %{x: false, prompt: "A body of water you definitely shouldn\u2019t swim in"},
    %{x: false, prompt: "Something fun to ask the old wise man on top of the mountain"},
    %{
      x: false,
      prompt:
        "A rejected tagline for <i>Star Trek<\/i> instead of \u201cSpace: the final frontier\u201d was \u201cSpace: <BLANK>\u201d"
    },
    %{x: false, prompt: "How would YOU fix the economy?"},
    %{x: false, prompt: "The hardest part about living in a submarine"},
    %{x: false, prompt: "If you really, really love something, let it <BLANK>"},
    %{x: false, prompt: "A name for a really scary swamp: <BLANK> Swamp"},
    %{
      x: false,
      prompt: "The name of the music playlist that will definitely put an end to the party"
    },
    %{x: false, prompt: "A bad name for a water park"},
    %{x: false, prompt: "A polite way to say \u201cbooger\u201d"},
    %{x: false, prompt: "A fun outfit to dress up the statue of David in"},
    %{
      x: false,
      prompt:
        "Kennedy\u2019s original speech said, \u201cAsk not what your country can do for you, ask <BLANK>\u201d"
    },
    %{x: false, prompt: "What the hot trend in weddings will be in the year 2046"},
    %{x: false, prompt: "Something fun to scream at a farmer\u2019s market"},
    %{x: false, prompt: "Mother Teresa\u2019s deepest secret "},
    %{x: false, prompt: "The most creative thing you can make entirely out of boogers"},
    %{x: false, prompt: "An ill-advised outfit to wear to your first day at a new job"},
    %{x: false, prompt: "Sleepwalking can be a problem but it\u2019s not as bad as sleep<BLANK>"},
    %{
      x: false,
      prompt:
        "In the future, RoboCop actually retires from the police force and becomes Robo-<BLANK>"
    },
    %{x: false, prompt: "What to do when your parachute fails"},
    %{x: false, prompt: "Something people used to do for fun before electricity"},
    %{x: false, prompt: "The most embarrassing crime to get caught committing"},
    %{x: false, prompt: "The name that cavemen probably gave to diarrhea"},
    %{x: false, prompt: "The worst person to share a hot tub with"},
    %{
      x: false,
      prompt:
        "A peculiar thing to see in a Help Wanted ad would be \u201cHelp Wanted: <BLANK>\u201d"
    },
    %{x: false, prompt: "What mustaches SHOULD be called"},
    %{x: false, prompt: "The worst pizza is <BLANK>-style pizza"},
    %{x: false, prompt: "A real weirdo would fall asleep to the sounds of <BLANK>"},
    %{x: false, prompt: "The name of a dog food brand you probably should not buy"},
    %{
      x: false,
      prompt:
        "Come up with a name for a generic brand of hot dogs that you probably shouldn\u2019t buy"
    },
    %{x: false, prompt: "Everything tastes better with <BLANK>"},
    %{x: false, prompt: "Life hack! Lower your heating bills by..."},
    %{x: false, prompt: "The worst thing that could crawl out of your toilet"},
    %{x: false, prompt: "The worst advice a doctor could give"},
    %{
      x: false,
      prompt:
        "Something a weatherman might yell if he completely snapped during the weather forecast"
    },
    %{x: false, prompt: "A great birthday present for your worst enemy"},
    %{x: false, prompt: "The name of a painting Michelangelo was ashamed he created"},
    %{
      x: false,
      prompt: "A clever thing for James Bond to say as he throws someone out of an airplane"
    },
    %{x: false, prompt: "No one would guess this is where the treasure is buried"},
    %{x: false, prompt: "The secret to a healthy head of hair"},
    %{x: false, prompt: "A strange thing to read on a door mat"},
    %{x: false, prompt: "The secret to a great marriage"},
    %{x: false, prompt: "What really happens if you stare at the sun too long"},
    %{x: false, prompt: "A prank the Supreme Court Justices probably play on each other"},
    %{x: false, prompt: "What the Easter Bunny does with his free time"},
    %{x: false, prompt: "A little known-perk of being U.S. president"},
    %{x: false, prompt: "A horrible charity: <BLANK> for Tots"},
    %{x: false, prompt: "A word that should be in the dictionary but isn\u2019t"},
    %{x: false, prompt: "A really odd thing to say on your deathbed"},
    %{
      x: false,
      prompt:
        "The Four Horsemen wouldn\u2019t be as scary if they were the Four <BLANK>men of the Apocalypse"
    },
    %{
      x: false,
      prompt:
        "It\u2019s illegal to yell \u201cFire!\u201d in a crowded theater, but it should also be illegal to yell, \u201c<BLANK>!\u201d"
    },
    %{x: false, prompt: "A good name for a pet cemetery"},
    %{x: false, prompt: "A new word for people that drive too slow in the fast lane"},
    %{x: false, prompt: "The perfect name for a second head that sprouts on your shoulder"},
    %{x: false, prompt: "The worst material from which to make a pair of pajamas"},
    %{x: false, prompt: "Queen Elizabeth\u2019s deepest, darkest secret"},
    %{x: false, prompt: "Come up with a slogan for the Russian Tourism Board"},
    %{x: false, prompt: "The best part about being Donald Trump"},
    %{x: false, prompt: "Tip: Never eat at a place called \u201cKentucky Fried <BLANK>\u201d"},
    %{
      x: false,
      prompt:
        "Sometimes John Travolta wildly mispronounces names. How might he wildly mispronounce his own name?"
    },
    %{x: false, prompt: "The worst toy store: Build-A-<BLANK> Workshop"},
    %{x: false, prompt: "The weirdest thing you can buy at the Vatican gift shop"},
    %{x: false, prompt: "The worst invention that starts with \u201cSpray-On\u201d"},
    %{x: false, prompt: "The name of a species of dinosaur you wouldn\u2019t want to meet"},
    %{x: false, prompt: "Something overheard at the Last Supper"},
    %{
      x: false,
      prompt:
        "A possible entry in Gary Busey\u2019s dream journal: \u201cTonight I dreamed <BLANK>\u201d"
    },
    %{x: false, prompt: "Something you can make out of body hair"},
    %{x: false, prompt: "The worst way to fly: <BLANK> Airlines"},
    %{x: false, prompt: "So... what was that movie <i>Birdman<\/i> about anyway?"},
    %{x: false, prompt: "A great pet name for a parasitic worm that lives in your ear"},
    %{x: false, prompt: "An idea for Lady Gaga\u2019s next crazy outfit: a <BLANK> dress"},
    %{
      x: false,
      prompt:
        "Little-known fact: Over the course of a lifetime, an average person accidentally eats ten <BLANK>"
    },
    %{x: false, prompt: "Something you probably shouldn\u2019t try to sell on eBay"},
    %{x: false, prompt: "The worst air freshener scent"},
    %{x: false, prompt: "A terrible thing to sign on the cast of your friend\u2019s broken leg"},
    %{
      x: false,
      prompt:
        "It would be awesome to win <i>Jeopardy<\/i> with the phrase, \u201cWhat is <BLANK>, Alex?\u201d"
    },
    %{x: false, prompt: "A sign you probably shouldn\u2019t put up in your yard"},
    %{x: false, prompt: "A bad title for a self-help book"},
    %{x: false, prompt: "An unusual \u201cSpecial Skill\u201d to include on your resume"},
    %{x: false, prompt: "What kittens would say if they could talk"},
    %{x: false, prompt: "A strange thing to keep as a pet"},
    %{x: false, prompt: "The worst thing about Canada"},
    %{x: false, prompt: "You should never share <BLANK> with someone else"},
    %{x: false, prompt: "The grossest thing you could find at the bottom of a swimming pool"},
    %{
      x: false,
      prompt: "The sound a tree actually makes when it falls and no one is around to hear it"
    },
    %{x: false, prompt: "You need three things to live: food, water, and <BLANK>"},
    %{x: false, prompt: "A good use for toenail clippings"},
    %{x: false, prompt: "What you would do with two free hours and a flamethrower"},
    %{x: false, prompt: "The worst name for an SUV"},
    %{x: false, prompt: "New sport idea: professional <BLANK>"},
    %{x: false, prompt: "Trash talk you would hear at a chess meet"},
    %{x: false, prompt: "Something you shouldn\u2019t stuff with cheese"},
    %{x: false, prompt: "Something pirates probably aren\u2019t very good at"},
    %{x: false, prompt: "Everyone knows there\u2019s no such thing as <BLANK>"},
    %{x: false, prompt: "A completely untrue rumor about Alvin from Alvin and the Chipmunks"},
    %{x: false, prompt: "You should never <BLANK> and <BLANK> at the same time"},
    %{x: false, prompt: "The worst thing about being a billionaire"},
    %{x: false, prompt: "Briefly describe your imaginary friend"},
    %{x: false, prompt: "New movie idea: <i>The Muppets Take <BLANK><\/i>"},
    %{x: false, prompt: "What you call a baby sasquatch"},
    %{x: false, prompt: "What is a tree thinking all day?"},
    %{x: false, prompt: "The best use for a leftover meatball"},
    %{x: false, prompt: "A bad reason to call 911"},
    %{x: false, prompt: "The best way to quickly blow a million dollars"},
    %{x: false, prompt: "Your first decree after being named Supreme Ruler of Earth"},
    %{x: false, prompt: "The worst thing to receive for trick-or-treat"},
    %{x: false, prompt: "Come up with a name for a kooky ostrich who solves mysteries"},
    %{x: false, prompt: "A phrase you would love to hear Morgan Freeman say"},
    %{x: false, prompt: "USA! USA! America is still number one in..."},
    %{x: false, prompt: "An Olympic sport that never made it: Synchronized <BLANK>"},
    %{x: false, prompt: "The government should legalize..."},
    %{x: false, prompt: "The first thing to do if you\u2019re attacked by a shark"},
    %{x: false, prompt: "The worst thing to find growing on your neck"},
    %{x: false, prompt: "A little-known fact about the Jolly Green Giant"},
    %{
      x: false,
      prompt: "The perfect meal would be a <BLANK> stuffed in a <BLANK> stuffed in a <BLANK>"
    },
    %{x: false, prompt: "What\u2019s black and white and red all over?"},
    %{x: false, prompt: "New show idea: <i>America\u2019s Next Top <BLANK><\/i>"},
    %{x: false, prompt: "It never ends well when you mix <BLANK> and <BLANK>"},
    %{x: false, prompt: "Invent a silly British term for pooping"},
    %{x: false, prompt: "The best reason to go to Australia"},
    %{x: false, prompt: "The beauty pageant no one wants to see: Miss <BLANK>"},
    %{x: false, prompt: "The most boring graffiti you could see in the subway"},
    %{x: false, prompt: "A slogan to get everyone excited about corn"},
    %{x: false, prompt: "You never forget your first <BLANK>"},
    %{x: false, prompt: "Little-known fact: The human body is approximately 80% <BLANK>"},
    %{x: false, prompt: "Coming soon to a theater near you: Benedict Cumberbatch is <BLANK>"},
    %{x: false, prompt: "Something you shouldn\u2019t buy at a yard sale"},
    %{x: false, prompt: "If we only use 10% of our brains, what\u2019s the other 90% doing?"},
    %{x: false, prompt: "What you want your gravestone to read"},
    %{x: false, prompt: "The worst menu item that starts with \u201cAll You Can Eat\u201d"},
    %{x: false, prompt: "A sign you wouldn\u2019t want to see at a seafood restaurant"},
    %{x: false, prompt: "Something fun to yell during an opera"},
    %{x: false, prompt: "A group activity at a really bad summer camp"},
    %{
      x: false,
      prompt:
        "A Girl Scouts cookie name that got rejected because it was just too ridiculous-sounding"
    },
    %{x: false, prompt: "The least impressive Boy Scout badge"},
    %{x: false, prompt: "The worst ringtone for a cell phone"},
    %{x: false, prompt: "A great nickname for your armpit hair"},
    %{x: false, prompt: "\u201cKnock, knock!\u201d \u201cWho\u2019s there?\u201d <BLANK>"},
    %{x: false, prompt: "A Tweet from a caveman"},
    %{x: false, prompt: "A message found in a bottle floating in the sea"},
    %{x: false, prompt: "The worst car feature that ends with \u201cholder\u201d"},
    %{x: false, prompt: "What Chewbacca has really been yelling all these years"},
    %{x: false, prompt: "The most stereotypical country song title"},
    %{x: false, prompt: "The best way to survive a bear attack is <BLANK>"},
    %{x: false, prompt: "The worst name for a funeral home"},
    %{x: false, prompt: "An angry internet comment on a pet store\u2019s website"},
    %{x: false, prompt: "The worst name for a rap artist"},
    %{x: false, prompt: "A rejected shape for Marshmallow Peeps"},
    %{x: false, prompt: "Something that should never be \u201chomemade\u201d"},
    %{x: false, prompt: "Three things MacGyver needs to make a bomb"},
    %{x: false, prompt: "Another use for marshmallows"},
    %{x: false, prompt: "Another use for gravy"},
    %{x: false, prompt: "A great way to cure the hiccups"},
    %{x: false, prompt: "An animal Noah shouldn\u2019t have saved"},
    %{x: false, prompt: "The biggest secret the government keeps"},
    %{x: false, prompt: "Something you wouldn\u2019t expect a Ouija board to say"},
    %{x: false, prompt: "The best way to defeat terrorism is..."},
    %{x: false, prompt: "Come up with a name for a salad dressing by Lindsay Lohan"},
    %{x: false, prompt: "The best way to tell if a tomato is ripe"},
    %{x: false, prompt: "A good post-music career for Justin Bieber"},
    %{x: false, prompt: "Come up with a name for a sitcom about a bunch of wacky nuns"},
    %{x: false, prompt: "A completely wrong way to spell \u201cJennifer Aniston\u201d"},
    %{x: false, prompt: "The 11th Commandment: Thou shalt not..."},
    %{x: false, prompt: "The best way to scare a burglar"},
    %{x: false, prompt: "The worst thing to yell while a professional golfer putts"},
    %{x: false, prompt: "The second thing said on the moon"},
    %{x: false, prompt: "Something you can only do in a Walmart if no one\u2019s looking"},
    %{x: false, prompt: "A name for a really cheap hotel"},
    %{x: false, prompt: "The worst name for a mountain"},
    %{x: false, prompt: "Why so serious?"},
    %{x: false, prompt: "The best thing about being really dumb"},
    %{x: false, prompt: "A thought that keeps Santa Claus awake at night"},
    %{x: false, prompt: "The real secret to living to age 100"},
    %{x: false, prompt: "What really happens if you tear off that mattress tag"},
    %{x: false, prompt: "A bad first line for your presidential inauguration speech"},
    %{x: false, prompt: "A fun thing to do with a bowl of pudding"},
    %{x: false, prompt: "Another use for cooked spaghetti"},
    %{x: false, prompt: "A weird physical way to greet someone"},
    %{x: false, prompt: "The worst name for a tanning salon"},
    %{x: false, prompt: "The worst word that can come before \u201cfart\u201d"},
    %{x: false, prompt: "A bad substitute for a toothbrush"},
    %{x: false, prompt: "A trick you shouldn\u2019t teach your dog"},
    %{x: false, prompt: "The worst material with which to make a snowman"},
    %{
      x: false,
      prompt: "A terrible sportscaster catchphrase for when somebody dunks a basketball"
    },
    %{x: false, prompt: "The first thing a pig would say if it could talk"},
    %{x: false, prompt: "The worst shape for an animal cracker"},
    %{x: false, prompt: "A surprising job entry on Abraham Lincoln\u2019s resume"},
    %{
      x: false,
      prompt: "Something you\u2019d yell to heckle the performing dolphins at Sea World"
    },
    %{x: false, prompt: "The worst name for a \u201cbig and tall\u201d store"},
    %{x: false, prompt: "The name of a shampoo for hippies"},
    %{x: false, prompt: "A new name for kumquats"},
    %{x: false, prompt: "An angry review you\u2019d give this game (Quiplash)"},
    %{x: false, prompt: "The worst thing to wear to your court trial"},
    %{x: false, prompt: "A rejected crayon color"},
    %{x: false, prompt: "Graffiti you might find in a kindergarten"},
    %{x: false, prompt: "The first sign that you\u2019re old"},
    %{x: false, prompt: "The worst question to ask during a White House tour"},
    %{
      x: false,
      prompt:
        "Tomorrow\u2019s news headline: \u201cScientists Are Shocked to Discover That <BLANK>\u201d"
    },
    %{x: false, prompt: "A terrible talent to have for the Miss America Pageant"},
    %{x: false, prompt: "Bad advice for new graduates"},
    %{x: false, prompt: "The best way to tell if someone is dead"},
    %{x: false, prompt: "A TMZ headline you really want to see"},
    %{x: false, prompt: "What you hope the Mars Rover finds"},
    %{x: false, prompt: "Where missing socks go"},
    %{x: false, prompt: "A rejected phrase for one of those Valentine heart candies"},
    %{x: false, prompt: "Something that will get you thrown out of a Wendy\u2019s"},
    %{
      x: false,
      prompt:
        "It would be scary to read on a food package, \u201cMay contain trace elements of <BLANK>.\u201d"
    },
    %{
      x: false,
      prompt: "A just-so-crazy-it\u2019s-brilliant business idea to pitch on <i>Shark Tank<\/i>"
    },
    %{x: false, prompt: "A terrifying fortune cookie fortune"},
    %{x: false, prompt: "Something the devil is afraid of"},
    %{x: false, prompt: "CBS should air a TV show about lawyers who are also <BLANK>"},
    %{x: false, prompt: "A great thing to yell before jumping out of an airplane"},
    %{x: false, prompt: "A gift nobody would want: The <BLANK> of the Month Club"},
    %{x: false, prompt: "A better name for the game Duck Duck Goose"},
    %{x: false, prompt: "A bad way to remove unsightly chest hair"},
    %{x: false, prompt: "An unusual theme for a kid\u2019s lunchbox"},
    %{x: false, prompt: "What the government is hiding from the public in Area 497"},
    %{x: false, prompt: "What your pancreas tests revealed"},
    %{x: false, prompt: "A bad, one-word slogan for a presidential campaign"},
    %{x: false, prompt: "Something you'd make a butler do the moment you hired him"},
    %{x: false, prompt: "Why did the mortician cross the road?"},
    %{x: false, prompt: "Something you should never try to heat in the microwave "},
    %{x: false, prompt: "A surprising thing to find inside a piñata "},
    %{x: false, prompt: "An alternate name for The Mona Lisa"},
    %{x: false, prompt: "A reason to travel back in time to two weeks ago"},
    %{
      x: false,
      prompt:
        "If you\u2019d never heard the term \u201cgreat white shark,\u201d what might you call it when you saw one for the first time?"
    },
    %{x: false, prompt: "A place where you're not likely to spot Bigfoot"},
    %{x: false, prompt: "Something you should never say as the captain of a bowling team"},
    %{x: false, prompt: "The dumbest person in the history of all time "},
    %{x: false, prompt: "Another name for the Grand Canyon"},
    %{x: false, prompt: "Another name for Canada"},
    %{x: false, prompt: "A bad use for clam chowder"},
    %{x: false, prompt: "\"On the 147th day of Christmas, my true love gave to me...\""},
    %{x: false, prompt: "The best name for an obese rapper"},
    %{x: false, prompt: "It would be most awesome for Chuck Norris to fight <BLANK>"},
    %{x: false, prompt: "A good puck replacement if they run out of pucks in a game of hockey"},
    %{x: false, prompt: "If animals took over, an exhibit you\u2019d see at the human zoo"},
    %{x: false, prompt: "A terrible wedding gift"},
    %{x: false, prompt: "A street name you never see"},
    %{x: false, prompt: "The first thing that pops into your mind right now"},
    %{x: false, prompt: "A weapon that should be added to the game Clue"},
    %{x: false, prompt: "The toy surprise in an Unhappy Meal"},
    %{
      x: false,
      prompt:
        "Make up a word for the watery substances that come out of a ketchup bottle when you first squeeze it"
    },
    %{x: false, prompt: "Make up a name for the space between your nostrils"},
    %{x: false, prompt: "Italy\u2019s newest tourist attraction: The <BLANK>Tower of Pisa"},
    %{x: false, prompt: "The worst theme for a pinball machine"},
    %{x: false, prompt: "The name of Jesus' 13th apostle"},
    %{x: false, prompt: "Something you don't want to find in your Christmas stocking"},
    %{x: false, prompt: "A title of a self-help book for rats"},
    %{x: false, prompt: "The worst thing you could rub all over your face"},
    %{x: false, prompt: "George W. Bush and Dick Cheney's rap duo name"},
    %{x: false, prompt: "Something you rarely see used as a car decoration"},
    %{x: false, prompt: "A historical event that would make a bad theme for a restaurant"},
    %{x: false, prompt: "The worst thing to try to sell door-to-door"},
    %{
      x: false,
      prompt: "Something you probably shouldn\u2019t bring on a trip across the Sahara desert"
    },
    %{x: false, prompt: "What's that stain?"},
    %{x: false, prompt: "Something you'd love to smash with a wrecking ball"},
    %{x: false, prompt: "A bad name for a pet goldfish"},
    %{x: false, prompt: "Life would be so much better if we all lived in <BLANK>"},
    %{
      x: false,
      prompt: "Something it\u2019s not a good idea to put in the overhead bin on an airplane"
    },
    %{x: false, prompt: "A weird thing for a bank robber to demand in a hostage situation"},
    %{
      x: false,
      prompt: "Something they will probably never make a series of commemorative stamps for"
    },
    %{x: false, prompt: "A club you wish they had in high school"},
    %{x: false, prompt: "The best prize you could find in a Cracker Jack box"},
    %{x: false, prompt: "The worst soup flavor: Cream of <BLANK>"},
    %{x: false, prompt: "A strange place to hold a family reunion"},
    %{x: false, prompt: "Something you\u2019d sneak into space, if you were an astronaut"},
    %{x: false, prompt: "What they really found in King Tut\u2019s tomb"},
    %{x: false, prompt: "The name of that cheese shop you\u2019re going to open some day"},
    %{x: false, prompt: "The liquid that would make for the worst salad dressing"},
    %{x: false, prompt: "An unusual motif for a baby\u2019s nursery"},
    %{x: false, prompt: "Another name for toe jam"},
    %{x: false, prompt: "A better name for dandruff"},
    %{x: false, prompt: "A terrible name to have if you\u2019re running for public office"},
    %{x: false, prompt: "Four out of five dentists agree you should never <BLANK>"},
    %{
      x: false,
      prompt: "Something that would make a creepy replacement for the horses on a merry-go-round"
    },
    %{x: false, prompt: "The worst thing to vomit into when you suddenly need to vomit"},
    %{x: false, prompt: "Make up a word that means \u201cto make up a word\u201d"},
    %{
      x: false,
      prompt:
        "Like Plutonium or Einsteinium, what would you name the next Periodic Table element they discover?"
    },
    %{x: false, prompt: "A bad name for a pirate"},
    %{
      x: false,
      prompt:
        "Something fun to scream when you win in a game of bingo, other than \u201cBingo!\u201d"
    },
    %{x: false, prompt: "A movie that should never be made into a theme park ride"},
    %{x: false, prompt: "A business or service that shouldn't have a drive-through window"},
    %{x: false, prompt: "Paul Bunyan\u2019s replacement for Babe The Blue Ox when he dies"},
    %{x: false, prompt: "The worst flavor for a sno-cone"},
    %{x: false, prompt: "What Smokey the Bear does when he\u2019s not fighting forest fires"},
    %{x: false, prompt: "Combine any two words to make a fun, new made-up word"},
    %{x: false, prompt: "A lesser-known ingredient in most microwave pizza pockets"},
    %{x: false, prompt: "A great place to hide an Easter egg"},
    %{x: false, prompt: "A trick you\u2019d like to see a poodle do"},
    %{x: false, prompt: "A better name for the Washington Monument"},
    %{
      x: false,
      prompt:
        "You never know when you\u2019re going to need insurance. You could wake up tomorrow and <BLANK>"
    },
    %{x: false, prompt: "The worst thing to overhear during your surgery"},
    %{x: false, prompt: "A bad name for a brand of bottled water"},
    %{x: false, prompt: "How do you like it?"},
    %{x: false, prompt: "Come up with a new dessert that contains the name of a U.S. state"},
    %{
      x: false,
      prompt:
        "The first and second rules of Fight Club are \u201cDon\u2019t talk about Fight Club,\u201d but what\u2019s the 387th rule of Fight Club?"
    },
    %{
      x: false,
      prompt: "A terrible food truck would be one that goes around selling only <BLANK>"
    },
    %{x: false, prompt: "A reason to get into a fist fight with a koala bear "},
    %{
      x: false,
      prompt:
        "Little-known fact: the fourth Wise Man gave baby Jesus the worst gift of all: <BLANK> "
    },
    %{x: false, prompt: "A theme for a desk calendar that wouldn\u2019t sell very well "},
    %{x: false, prompt: "The worst thing you could stick in a toaster "},
    %{x: false, prompt: "The worst Halloween costume for a young child"},
    %{
      x: false,
      prompt:
        "\u201cThis just in! A <BLANK> has won the election and will become the new governor of Texas.\u201d "
    },
    %{x: false, prompt: "A better name for the human bladder"},
    %{x: false, prompt: "Surprising first words for your baby to speak"},
    %{x: false, prompt: "A good name for a dog country singer"},
    %{x: false, prompt: "A lawn decoration sure to make the neighbors mad"},
    %{x: false, prompt: "The worst thing to say when trying to adopt a pet"},
    %{x: false, prompt: "Fun thing to do if locked in the mall overnight"},
    %{x: false, prompt: "The worst person to receive a sponge bath from"},
    %{
      x: false,
      prompt:
        "People wouldn\u2019t respect He-Man as much if, to gain his power, he held up his sword and shouted \u201c____________________\u201d"
    },
    %{x: false, prompt: "Pants would be a whole lot better if they <BLANK>"},
    %{x: false, prompt: "A little-known way to get gum out of your hair"},
    %{x: false, prompt: "The most awesome Guinness World Record to break"},
    %{
      x: false,
      prompt: "It\u2019s bad to be buried alive. It\u2019s worse to be buried alive with <BLANK>."
    },
    %{x: false, prompt: "Something that would not work as well as skis"},
    %{x: false, prompt: "What to say to get out of jury duty"},
    %{x: false, prompt: "A rejected name for a ship in the U.S. Naval Fleet: the USS <BLANK>"},
    %{
      x: false,
      prompt:
        "A rejected title for <i>The Good, The Bad and the Ugly<\/i> was <i>The Good, the Bad and the <BLANK><\/i>"
    },
    %{
      x: false,
      prompt:
        "Little-known fact: The government allows peanut butter to contain up to 10% <BLANK>"
    },
    %{x: false, prompt: "A good sign that your house is haunted"},
    %{x: false, prompt: "A bad occupation for a robot to have"},
    %{x: false, prompt: "A sequel to the painting \u201cDogs Playing Poker\u201d"},
    %{x: false, prompt: "The Tooth Fairy\u2019s other job"},
    %{x: false, prompt: "Little-known fact: A secret area in the White House is the <BLANK> room"},
    %{x: false, prompt: "An invention by Thomas Edison that never caught on"},
    %{x: false, prompt: "A birthday present you shouldn\u2019t get for your grandmother"},
    %{x: false, prompt: "What time is it?"},
    %{x: false, prompt: "Invent a Christmas tradition sure to catch on"},
    %{x: false, prompt: "A short motto everyone should live by"},
    %{x: false, prompt: "The best way to start your day"},
    %{x: false, prompt: "A good improvement to make to Mt. Rushmore"},
    %{x: false, prompt: "The worst name for a summer camp"},
    %{x: false, prompt: "The first commandment in the new religion you started"},
    %{x: false, prompt: "Three things are certain in life: Death, Taxes, and <BLANK>"},
    %{
      x: false,
      prompt:
        "A faster way to get home from the Land of Oz is to click your heels three times and say <BLANK>."
    },
    %{x: false, prompt: "Something that\u2019s made worse by adding cheese"},
    %{x: false, prompt: "Which new marshmallow should Lucky Charms cereal introduce?"},
    %{x: false, prompt: "The perfect song to hum on the toilet"},
    %{x: false, prompt: "A word that should never follow \u201cBeef\u201d"},
    %{x: false, prompt: "Something that is currently legal that should be banned"},
    %{x: false, prompt: "Come up with a name for a rock band made up entirely of baby ducks"},
    %{x: false, prompt: "We can all agree that <BLANK>"},
    %{x: false, prompt: "Something you shouldn\u2019t buy off of Craigslist"},
    %{x: false, prompt: "A bad thing to say to a cop as he writes you a speeding ticket"},
    %{x: false, prompt: "How far is too far?"},
    %{x: false, prompt: "If at first you don\u2019t succeed..."},
    %{x: false, prompt: "The name you would give to a really mopey pig"},
    %{x: false, prompt: "What robots dream about"},
    %{x: false, prompt: "What really happened to Amelia Earhart"},
    %{x: false, prompt: "Something you\u2019d be surprised to see come out of a pimple you pop"},
    %{x: false, prompt: "Today\u2019s music needs more <BLANK>"},
    %{
      x: false,
      prompt:
        "Finish this sentence: \u201cWhen I\u2019m rich, my mansion will have a room called The <BLANK> Room.\u201d"
    },
    %{x: false, prompt: "The best question to ask God when you meet him"},
    %{x: false, prompt: "A fun trick to play on your doctor"},
    %{
      x: false,
      prompt: "A bad place for your rocket ship to crash would be The Planet of the <BLANK>"
    },
    %{x: false, prompt: "A bad campaign slogan for a congressperson"},
    %{x: false, prompt: "A unique way to escape from prison"},
    %{x: false, prompt: "The next product for Matthew McConaughey to endorse"},
    %{x: false, prompt: "The title of a new YouTube cat video that\u2019s sure to go viral"},
    %{x: false, prompt: "Come up with the name of a country that doesn\u2019t exist"},
    %{x: false, prompt: "The best way to keep warm on a cold winter night"},
    %{x: false, prompt: "The real reason the dinosaurs died"},
    %{x: false, prompt: "Something you should never put on an open wound"},
    %{
      x: false,
      prompt:
        "Scientists say erosion, but we all know the Grand Canyon was actually made by <BLANK>"
    },
    %{x: false, prompt: "The name of a font nobody would ever use"},
    %{x: false, prompt: "The best thing about going to prison"},
    %{x: false, prompt: "The best title for a new national anthem for the USA"},
    %{x: false, prompt: "A college major you don\u2019t see at many universities"},
    %{x: false, prompt: "What would make baseball more entertaining to watch?"},
    %{x: false, prompt: "A little-known fact about Canada"},
    %{x: false, prompt: "Name a TV drama that\u2019s about a vampire doctor"},
    %{x: false, prompt: "A name for a brand of designer adult diapers"},
    %{x: false, prompt: "What\u2019s actually causing global warming?"},
    %{x: false, prompt: "The first thing you would do after winning the lottery"},
    %{x: false, prompt: "A name for a really bad Broadway musical"},
    %{
      x: false,
      prompt:
        "On your wedding night, it would be horrible to find out that the person you married is <BLANK>"
    },
    %{x: false, prompt: "The Skittles flavor that just missed the cut"},
    %{
      x: false,
      prompt: "What FDR meant to say was \u201cWe have nothing to fear, but <BLANK>\u201d"
    },
    %{x: false, prompt: "A terrible name for a cruise ship"},
    %{x: false, prompt: "What\u2019s the Mona Lisa smiling about?"},
    %{x: false, prompt: "The crime you would commit if you could get away with it"},
    %{x: false, prompt: "Something squirrels probably do when no one is looking"},
    %{
      x: false,
      prompt: "Something you shouldn\u2019t get your significant other for Valentine\u2019s Day"
    },
    %{x: false, prompt: "A dangerous thing to do while driving"},
    %{x: false, prompt: "The best thing about living in an igloo"},
    %{x: false, prompt: "Using only two words, a new state motto for Texas"},
    %{x: false, prompt: "The hardest thing about being Batman"},
    %{x: false, prompt: "Something you shouldn\u2019t wear to a job interview"},
    %{x: false, prompt: "The #1 reason penguins can\u2019t fly"},
    %{x: false, prompt: "The name of the reindeer Santa didn\u2019t pick to pull his sleigh"},
    %{x: false, prompt: "What\u2019s the first thing you would do if you could time travel?"},
    %{
      x: false,
      prompt: "What would you do if you were left alone in the White House for an hour?"
    },
    %{
      x: false,
      prompt: "Come up with the name of book that would sell a million copies, immediately"
    },
    %{x: false, prompt: "A not-very-scary name for a pirate"},
    %{x: false, prompt: "The name of a pizza place you should never order from"},
    %{x: false, prompt: "A Starbucks coffee that should never exist"},
    %{
      x: false,
      prompt:
        "There\u2019s Gryffindor, Ravenclaw, Slytherin, and Hufflepuff, but what\u2019s the Hogwarts house few have ever heard of?"
    },
    %{x: false, prompt: "Something you should never use as a scarf"},
    %{x: false, prompt: "The worst words to say for the opening of a eulogy at a funeral"},
    %{x: false, prompt: "Come up with a really bad TV show that starts with \u201cBaby\u201d"},
    %{x: false, prompt: "A great way to kill time at work"},
    %{x: false, prompt: "What\u2019s wrong with these kids today?"},
    %{x: false, prompt: "Why does the Tower of Pisa lean?"},
    %{x: false, prompt: "A great new invention that starts with \u201cAutomatic\u201d"},
    %{
      x: false,
      prompt:
        "Come up with a really bad football penalty that begins with \u201cIntentional\u201d"
    },
    %{x: false, prompt: "You know you\u2019re in for a bad taxi ride when <BLANK>"},
    %{
      x: false,
      prompt: "The terrible fate of the snowman Olaf in a director\u2019s cut of <i>Frozen<\/i>"
    },
    %{x: false, prompt: "Sometimes, after a long day, you just need to <BLANK>"},
    %{x: false, prompt: "The worst way to spell Mississippi"},
    %{x: false, prompt: "Give me one good reason why I shouldn\u2019t spank you right now"},
    %{x: false, prompt: "The best pick-up line for an elderly singles mixer"},
    %{x: false, prompt: "The best news you could get today"},
    %{x: false, prompt: "Invent a holiday that you think everyone would enjoy"},
    %{
      x: false,
      prompt:
        "Usually, it\u2019s bacon, lettuce and tomato, but come up with a BLT you wouldn\u2019t want to eat"
    },
    %{x: false, prompt: "The worst thing you could stuff a bed mattress with"},
    %{x: false, prompt: "A great opening line to start a conversation with a stranger at a party"},
    %{x: false, prompt: "Something you would like to fill a swimming pool with"},
    %{x: false, prompt: "Miley Cyrus\u2019 Wi-Fi password, possibly"},
    %{
      x: false,
      prompt:
        "If you were allowed to name someone else\u2019s baby any weird thing you wanted, what would you name it?"
    },
    %{x: false, prompt: "A terrible name for a clown"},
    %{
      x: false,
      prompt:
        "Miller Lite beer would make a lot of money if they came up with a beer called Miller Lite _____"
    },
    %{x: false, prompt: "Okay... fine! What do YOU want to talk about then?!!!"},
    %{
      x: false,
      prompt: "The Katy Perry Super Bowl halftime show would have been better with <BLANK>"
    },
    %{
      x: false,
      prompt:
        "Your personal catchphrase if you were on one of those <i>Real Housewives<\/i> shows"
    },
    %{x: false, prompt: "A good fake name to use when checking into a hotel"},
    %{x: false, prompt: "A vanity license plate a jerk in an expensive car would get"},
    %{x: false, prompt: "The name of a canine comedy club with puppy stand-up comedians"},
    %{x: false, prompt: "What\u2019s lurking under your bed when you sleep?"},
    %{x: false, prompt: "Come up with a name for the most difficult yoga pose known to mankind"},
    %{x: false, prompt: "One place a finger shouldn\u2019t go"},
    %{x: false, prompt: "The worst job title that starts with \u201cAssistant\u201d"},
    %{x: false, prompt: "The grossest thing you\u2019d put in your mouth for $18"},
    %{x: false, prompt: "The last person you\u2019d consider inviting to your birthday party"},
    %{x: false, prompt: "Where do you think the beef really is?"},
    %{x: false, prompt: "A fun trick to play on the Pope"},
    %{
      x: false,
      prompt: "Write a newspaper headline that will really catch people\u2019s attention"
    },
    %{x: false, prompt: "Something it\u2019d be fun to throw off the Eiffel Tower"},
    %{x: false, prompt: "Name the eighth dwarf, who got cut at the last minute"},
    %{
      x: false,
      prompt: "Come up with the name for a new TV show with the word \u201cSpanky\u201d in it"
    },
    %{x: false, prompt: "A good place to hide boogers"},
    %{x: false, prompt: "Come up with a catchier, more marketable name for the Bible"},
    %{x: false, prompt: "The best thing to use when you\u2019re out of toilet paper"},
    %{x: false, prompt: "A good way to get fired"},
    %{
      x: false,
      prompt:
        "The most presidential name you can think of (that isn\u2019t already the name of a president)"
    },
    %{x: false, prompt: "Something you should never say to your mother"},
    %{x: false, prompt: "Where\u2019s the best place to hide from the shadow monsters?"},
    %{x: false, prompt: "The three ingredients in the worst smoothie ever"},
    %{x: false, prompt: "Something that would make an awful hat"},
    %{x: false, prompt: "How many monkeys is too many monkeys?"},
    %{x: false, prompt: "Something you\u2019d be surprised to see a donkey do"},
    %{
      x: false,
      prompt: "The title you\u2019d come up with if you were writing the Olympics theme song"
    },
    %{
      x: false,
      prompt: "Name the sequel to <i>Titanic<\/i> if there were one. <i>Titanic 2: <BLANK><\/i>"
    },
    %{x: false, prompt: "An alternate use for a banana"},
    %{x: false, prompt: "What you\u2019d guess is an unadvertised ingredient in most hot dogs"},
    %{x: false, prompt: "Name your new haircutting establishment"},
    %{x: false, prompt: "An inappropriate thing to do at a cemetery"},
    %{
      x: false,
      prompt:
        "Like chicken fingers or chicken poppers, a new appetizer name for your fun, theme restaurant: chicken _____"
    },
    %{x: false, prompt: "Thing you\u2019d be most surprised to have a dentist find in your mouth"},
    %{x: false, prompt: "Rename Winnie-the-Pooh to something more appropriate/descriptive"},
    %{x: false, prompt: "The name of a clothing store for overweight leprechauns"},
    %{
      x: false,
      prompt:
        "If God has a sense of humor, he welcomes people to heaven by saying, \u201c<BLANK>\u201d"
    },
    %{x: false, prompt: "Something that would not work well as a dip for tortilla chips"},
    %{
      x: false,
      prompt: "Name a new movie starring a talking goat who is president of the United States"
    },
    %{x: false, prompt: "An item NOT found in Taylor Swift\u2019s purse"},
    %{x: false, prompt: "Name a new reggae band made up entirely of chickens"},
    %{x: false, prompt: "Who let the dogs out?"},
    %{x: false, prompt: "What do vegans taste like?"},
    %{
      x: false,
      prompt: "Make up a word that describes the sound of farting into a bowl of mac & cheese"
    },
    %{x: false, prompt: "A new ice cream flavor that no one would ever order"},
    %{x: false, prompt: "Name a children\u2019s book by someone who hates children"},
    %{x: false, prompt: "The name of your new plumbing company"},
    %{x: false, prompt: "The worst name for a robot"},
    %{x: false, prompt: "The first names of each of your nipples"},
    %{x: false, prompt: "What John Goodman\u2019s belches smell like"},
    %{x: false, prompt: "The name of a new perfume by Betty White"},
    %{x: false, prompt: "One thing never to do on a first date"},
    %{x: false, prompt: "Ozzy Osbourne\u2019s Twitter password, probably"},
    %{x: false, prompt: "The most embarrassing name for a dog"},
    %{x: false, prompt: "The worst thing you could discover in your burrito"},
    %{x: false, prompt: "Something you\u2019d probably find a lot of in God\u2019s refrigerator"},
    %{x: false, prompt: "Brand name of a bottled water sold in the land of Oz"},
    %{x: false, prompt: "The worst family secret that could come out over Thanksgiving dinner"},
    %{x: false, prompt: "A fun thing to yell as a baby is being born"},
    %{
      x: false,
      prompt: "The name of a toilet paper specifically designed for the Queen of England"
    },
    %{x: false, prompt: "A terrible name for a 1930s gangster"},
    %{
      x: false,
      prompt:
        "Something upsetting you could say to the cable guy as he installs your television service"
    },
    %{x: false, prompt: "Come up with a name for a new beer marketed toward babies"},
    %{x: false, prompt: "A terrible theme for a high school prom"},
    %{x: false, prompt: "A more environment-friendly alternative to toilet paper"},
    %{x: false, prompt: "What tattoo should Justin Bieber get next?"},
    %{x: false, prompt: "What do kittens dream of?"},
    %{x: false, prompt: "What makes hot dogs taste so good?"},
    %{x: false, prompt: "A better name for France"},
    %{x: false, prompt: "The worst thing to find stuck in your teeth"},
    %{x: false, prompt: "The worst excuse for showing up late to work"},
    %{x: false, prompt: "The worst thing for an evil witch to turn you into"},
    %{x: false, prompt: "Jesus\u2019s REAL last words"},
    %{x: false, prompt: "The biggest downside to living in Hell"},
    %{x: false, prompt: "Everyone knows that monkeys hate <BLANK>"},
    %{x: false, prompt: "Name a candle scent designed specifically for Kim Kardashian"},
    %{
      x: false,
      prompt:
        "If a winning coach gets Gatorade dumped on his head, what should get dumped on the losing coach?"
    },
    %{x: false, prompt: "The secret to a happy life"},
    %{x: false, prompt: "You would never go on a roller coaster called <BLANK>"},
    %{x: false, prompt: "What two words would passengers never want to hear a pilot say?"},
    %{x: false, prompt: "The worst name for a race horse"},
    %{
      x: false,
      prompt: "Come up with a three-word sequel to the book \u201cEat, Pray, Love\u201d"
    },
    %{
      x: false,
      prompt: "You wouldn\u2019t want to share a prison cell with someone named <BLANK>"
    },
    %{x: false, prompt: "Superman\u2019s special power that he never tells anyone about"},
    %{x: false, prompt: "You shouldn\u2019t get a massage at a place called <BLANK>"},
    %{x: false, prompt: "The least romantic place to propose marriage"},
    %{x: false, prompt: "A rejected name for the Segway"},
    %{x: true, prompt: "The most inappropriate song to hear at a kid\u2019s piano recital"},
    %{x: true, prompt: "A unique way to amputate your toe"},
    %{x: true, prompt: "One perk of marrying a serial killer"},
    %{x: true, prompt: "What a unicorn\u2019s butt smells like"},
    %{x: true, prompt: "A better name for a corset"},
    %{x: true, prompt: "A sign that you\u2019re pregnant with an evil baby"},
    %{x: true, prompt: "How Yogi Bear eventually meets his death"},
    %{
      x: true,
      prompt:
        "Most people think Julius Caesar said \u201cEt tu, Brute?\u201d when he got stabbed, but what he really said was <BLANK>"
    },
    %{x: true, prompt: "What really pisses off a ghost?"},
    %{x: true, prompt: "Instead of \u201cHump Day,\u201d we should call Wednesday <BLANK>"},
    %{x: true, prompt: "What Michaelangelo said as he chiseled <i>David<\/i>\u2019s penis"},
    %{x: true, prompt: "The best cure for a hangover"},
    %{x: true, prompt: "How do proctologists cheer themselves up?"},
    %{
      x: true,
      prompt: "A disturbing thing to hear your significant other say while sleep-talking"
    },
    %{x: true, prompt: "The weirdest place to see an image of the The Virgin Mary"},
    %{x: true, prompt: "The worst thing that happened on Noah\u2019s Ark"},
    %{
      x: true,
      prompt:
        "Bad: You\u2019re lost in the woods. Worse: You\u2019re also completely naked. Worst: And you\u2019re also <BLANK>"
    },
    %{x: true, prompt: "How you can tell you\u2019re drinking really cheap wine"},
    %{
      x: true,
      prompt:
        "An obscure Surgeon General warning that most people don\u2019t know about: \u201cSmoking may cause <BLANK>\u201d"
    },
    %{x: true, prompt: "A lesser-known Medieval torture device: The <BLANK>"},
    %{x: true, prompt: "How you can tell it\u2019s time to throw out a pair of underwear"},
    %{x: true, prompt: "What Wild Bill Hickok named his penis, probably"},
    %{x: true, prompt: "The crappiest western was <i>Gunfight at the <BLANK> Corral<\/i>"},
    %{x: true, prompt: "Something you should never stuff a bra with"},
    %{x: true, prompt: "The strangest new military weapon: <BLANK>-seeking missiles"},
    %{x: true, prompt: "The polite thing to bring to an orgy in the suburbs"},
    %{x: true, prompt: "A popular TV show title with the word \u201cpoop\u201d inserted"},
    %{x: true, prompt: "Yet another practical use for placenta"},
    %{
      x: true,
      prompt:
        "A surprising new part of the field sobriety test requires you to <BLANK> to prove you\u2019re not drunk"
    },
    %{x: true, prompt: "A name for a sexy turtle"},
    %{x: true, prompt: "What Little Bo Peep would confess if she got really drunk"},
    %{
      x: true,
      prompt:
        "The first thought that runs through your head when a lobster clamps onto your genitals"
    },
    %{x: true, prompt: "An inappropriate ice sculpture for a wedding reception"},
    %{x: true, prompt: "The punchline to an off-color <i>Star Wars<\/i> joke"},
    %{x: true, prompt: "A shocking find in Clifford the Big Red Dog\u2019s poop"},
    %{
      x: true,
      prompt: "What happens when you finally make eye contact with the crazy person on the subway"
    },
    %{x: true, prompt: "An inappropriate thing for a detective to say at a crime scene"},
    %{x: true, prompt: "The one phrase the NSA is tired of watching us type into Google"},
    %{x: true, prompt: "Aw screw it... just type in something dirty"},
    %{
      x: true,
      prompt:
        "Rename any famous work of literature so that it is ruined by the word \u201cbutt\u201d"
    },
    %{x: true, prompt: "The secret to being a great kisser"},
    %{x: true, prompt: "A funny thing to write down on a form when it asks for your sex"},
    %{x: true, prompt: "A poor substitute for underwear"},
    %{
      x: true,
      prompt: "The worst children\u2019s board game would be \u201c<BLANK>, <BLANK> Hippos\u201d"
    },
    %{x: true, prompt: "The worst thing to whisper during pillow talk"},
    %{
      x: true,
      prompt: "Something that absolutely doesn\u2019t make you think of a penis on some level"
    },
    %{x: true, prompt: "A good sign that your dog is really an a-hole"},
    %{x: true, prompt: "The strangest reason to get a divorce"},
    %{x: true, prompt: "Something inappropriate to do at the gym"},
    %{x: true, prompt: "A secret ability of boobs"},
    %{x: true, prompt: "The most G-rated term for an erection"},
    %{x: true, prompt: "The name of a sexy new dance move"},
    %{x: true, prompt: "What sperm yell as they swim"},
    %{x: true, prompt: "The Old English term for \u201cvagina\u201d"},
    %{x: true, prompt: "A strange side effect to hear during a drug commercial"},
    %{x: true, prompt: "Another use for tampons"},
    %{x: true, prompt: "The dumbest method of birth control"},
    %{x: true, prompt: "The name of the website that probably gave your computer a virus"},
    %{x: true, prompt: "How Garfield the cartoon cat will eventually die"},
    %{x: true, prompt: "The worst slogan for an erectile dysfunction pill"},
    %{x: true, prompt: "A crazy thing to find during a colonoscopy"},
    %{x: true, prompt: "The worst thing you can tell the kids about the death of the family dog"},
    %{x: true, prompt: "Advice: Never stick your tongue into <BLANK>"},
    %{
      x: true,
      prompt: "Something a talking doll probably should NOT say when you pull the string"
    },
    %{
      x: true,
      prompt: "A kinky weird thing that does NOT happen in 50 Shades of Grey (as far as you know)"
    },
    %{x: true, prompt: "The biggest complaint of people in Hell"},
    %{x: true, prompt: "A weirdly enticing subject line for an email in your SPAM folder"},
    %{
      x: true,
      prompt:
        "A new, completely BS holiday that greeting card companies would make up to sell more cards"
    },
    %{x: true, prompt: "Name the next big sexually transmitted disease"},
    %{x: true, prompt: "What happens to circumcision skin"},
    %{x: true, prompt: "What dogs think when they see people naked"},
    %{x: true, prompt: "The title of the most boring porno ever"},
    %{x: true, prompt: "Something Godzilla does when he\u2019s drunk"},
    %{x: true, prompt: "A good name for an elderly nudist colony"},
    %{x: true, prompt: "An inappropriate thing to say via skywriting"},
    %{x: true, prompt: "A good name for a sex robot"},
    %{x: true, prompt: "A cute name for hemorrhoids"},
    %{x: true, prompt: "Something in a weirdo\u2019s bedroom"},
    %{x: true, prompt: "The worst song to play when stripping for your lover"},
    %{x: true, prompt: "A movie that could use some nudity"},
    %{x: true, prompt: "Pick any city name and make it sound dirty"},
    %{x: true, prompt: "An item on every pervert\u2019s grocery list"},
    %{x: true, prompt: "The password to the secret, high-society sex club down the street"},
    %{x: true, prompt: "You know you\u2019re really drunk when..."},
    %{x: true, prompt: "What they call pooping in the Land of Oz"},
    %{x: true, prompt: "What Santa does with a dead elf"},
    %{x: true, prompt: "The least popular item in the Victoria\u2019s Secret catalog"},
    %{x: true, prompt: "The worst way to remove pubic hair"},
    %{x: true, prompt: "A Facebook status you don\u2019t want your grandparents to see"},
    %{x: true, prompt: "A tourist attraction in Hell"},
    %{x: true, prompt: "A new slang term for impotence"},
    %{x: true, prompt: "A weird thing to find in your grandparents\u2019 bedside table"},
    %{x: true, prompt: "The name of a cocktail for hillbillies"},
    %{x: true, prompt: "What a dog sext message might say"},
    %{x: true, prompt: "The 6,077th layer of Hell is reserved for <BLANK>"},
    %{x: true, prompt: "An image that would make the Sistine Chapel's ceiling look more badass"},
    %{x: true, prompt: "What deer would use for bait if they hunted hunters"},
    %{x: true, prompt: "A punch line for a joke that would make children cry"},
    %{x: true, prompt: "A brand name for a medication that intentionally CAUSES male impotence"},
    %{x: true, prompt: "Make up a schoolyard game that children should never play at recess"},
    %{x: true, prompt: "A magazine that should never have a nude centerfold"},
    %{x: true, prompt: "An inappropriate theme for a set of kids\u2019 pajamas"},
    %{x: true, prompt: "Another name for a rectal thermometer"},
    %{x: true, prompt: "The most bitching thing you can airbrush on your van"},
    %{
      x: true,
      prompt:
        "The Seven Deadly Sins are lust, gluttony, greed, envy, pride, wrath, and sloth. The Eighth Deadly Sin is..."
    },
    %{x: true, prompt: "Come up with a name for a fast food chain that only serves rabbit meat"},
    %{x: true, prompt: "Something fun to do with your kidney stones after you pass them"},
    %{x: true, prompt: "An unusual object to bludgeon someone to death with"},
    %{x: true, prompt: "The least-threatening name for a serial killer: The Boston <BLANK>"},
    %{x: true, prompt: "The first inductee of the A-hole Hall of Fame "},
    %{x: true, prompt: "A name for a new cereal that\u2019s for adults only"},
    %{x: true, prompt: "Make up a curse word"},
    %{
      x: true,
      prompt:
        "The celebrity you\u2019d eat first if you were a cannibal, and the side dish you\u2019d eat them with"
    },
    %{
      x: true,
      prompt: "Santa Claus would be a bigger badass if his sleigh were driven by eight tiny\u2026"
    },
    %{
      x: true,
      prompt: "A good name for a restaurant that serves animals with the faces still on them "
    },
    %{x: true, prompt: "A name for a board game designed to give children nightmares "},
    %{
      x: true,
      prompt: "The worst person to narrate the audiobook of <i>Fifty Shades of Grey<\/i>"
    },
    %{x: true, prompt: "A good name for an erotic bakery"},
    %{x: true, prompt: "What the Statue of Liberty is hiding beneath that robe"},
    %{
      x: true,
      prompt: "There\u2019s only one time that murder is acceptable and that is when <BLANK>"
    },
    %{
      x: true,
      prompt:
        "Take any well-known restaurant and slightly change its name to something inappropriate"
    },
    %{x: true, prompt: "A catchy name for a sperm bank"},
    %{x: true, prompt: "A bad place to skinny-dip"},
    %{x: true, prompt: "A bad thing to yell during church"},
    %{x: true, prompt: "The unsexiest thought you can have"},
    %{
      x: true,
      prompt: "Take any U.S. president\u2019s name and turn it into something inappropriate"
    },
    %{x: true, prompt: "A great name to have on a fake I.D."},
    %{x: true, prompt: "The name of an all-male version of Hooters"},
    %{x: true, prompt: "Two people from history that should definitely have sex"},
    %{x: true, prompt: "The coolest way to die"},
    %{x: true, prompt: "A little-known nickname for New Orleans"},
    %{x: true, prompt: "Come up with a title for an adult version of any classic video game"},
    %{x: true, prompt: "Come up with a great title for the next awkward teen sex movie"},
    %{x: true, prompt: "Come up with a name for a beer made especially for monkeys"},
    %{x: true, prompt: "The worst way to be murdered"},
    %{x: true, prompt: "A better name for testicles"},
    %{
      x: true,
      prompt:
        "Invent a family-friendly replacement word that you could say instead of an actual curse word"
    },
    %{x: true, prompt: "Where do babies come from?"},
    %{x: true, prompt: "A fun thing to think about during mediocre sex"},
    %{x: true, prompt: "Something you should never stick up your butt"},
    %{x: true, prompt: "A good catchphrase to yell every time you finish pooping"},
    %{x: true, prompt: "Make up the title of a movie that is based on the first time you had sex"},
    %{x: true, prompt: "A great name for a nude beach in Alaska"},
    %{x: true, prompt: "A good stage name for a chimpanzee stripper"},
    %{x: true, prompt: "The best place to bury all those bodies"},
    %{
      x: true,
      prompt: "If we can\u2019t afford to bury or cremate you, what should we do with your body?"
    },
    %{x: true, prompt: "Come up with a name for a new, very manly cocktail"},
    %{x: true, prompt: "Make up a name for a silent-film porno from the 1920s"},
    %{x: true, prompt: "Something you should not whisper to your grandmother"},
    %{x: true, prompt: "The worst thing that could jump out of a bachelor party cake"},
    %{x: true, prompt: "What aliens do with you after the anal probe"},
    %{x: true, prompt: "You should never give alcohol to <BLANK>"},
    %{x: true, prompt: "A great brand name for extra-extra-large condoms"},
    %{x: true, prompt: "What the genitalia on a Tofurky is called"}
  ]

  def get_random(number) do
    1..number
    |> Enum.map(fn _ -> Enum.random(@prompts)[:prompt] end)
  end
end
