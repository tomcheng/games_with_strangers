defmodule YouBet.Questions do
@one_off_questions [
{:architecture, "How many steps does the Eiffel Tower have?", 1_792},
{:architecture, "How many rooms does Buckingham Palace have?", 775},
{:architecture, "How many rivets does the Eiffel Tower have?", 2_500_000},
{:architecture, "How many points are on the Statue of Liberty's crown?", 7},
{:architecture, "How tall is the Great Pyramid of Giza, in meters?", 138},
{:architecture, "How many steps does the CN Tower have?", 1_776},
{:astronomy, "How many Earths would fit inside Jupiter?", 1300},
{:astronomy, "How many moons does Jupiter have?", 67},
{:astronomy, "How wide, in kilometres, are Saturns Rings?", 282_000},
{:astronomy, "What is the Moon's diameter, in kilometres?", 3_476},
{:astronomy, "How many times larger than Earth is the Sun?", 330_330},
{:astronomy, "How many tons des the sun lose every year?", 360_000_000},
{:astronomy, "What is the diameter of the sun, in kilometres?", 1_390_000},
{:astronomy, "What is the temperature at the center of the Sun, in degrees Celcius?", 15_000_000},
{:biology, "How many muscles do cats have in each ear?", 32},
{:biology, "On average, how many times a day does a cow defecate?", 16},
{:biology, "How many breaths does the average adult take each year?", 8409600},
{:biology, "What percentage of DNA do humans share with slugs?", 70},
{:biology, "How many times does a whale's heart beat per minute?", 9},
{:biology, "How many muscles are in an elephant trunk?", 15_000},
{:biology, "How many eyes does a butterfly have?", 12_000},
{:biology, "How many years did the oldest recorded elephant live?", 82},
{:biology, "What percentage of plant life is found in the ocean?", 85},
{:biology, "How many bones are in a human foot?", 26},
{:biology, "How long are an average human's eyes closed per day due to blinking, in minutes?", 30},
{:biology, "How many hours a day do koalas sleep?", 18},
{:biology, "How long was the longest recorded flight of a chicken, in seconds?", 13},
{:biology, "What is the lifespace of a squirrel, in years?", 9},
{:biology, "How many eggs per year does the average hen lay?", 228},
{:biology, "How many bones does a human head contain?", 22},
{:biology, "How fast can dolphins swim, in kilometres per hour?", 60},
{:biology, "How fast can sharks swim, in kilometres per hour?", 70},
{:biology, "How fast can cheetahs run, in kilometres per hour?", 114},
{:biology, "How fast can a greyhound run, in kilometres per hour?", 67},
{:biology, "How many spikes does the average porcupine have?", 30_000},
{:biology, "What percentage of a banana is water?", 75},
{:biology, "How fast can a honeybee fly, in kilometres per hour?", 24},
{:biology, "How many litres of water can an elephant's trunk hold?", 5},
{:biology, "How many meters of blood vessels does a human body have?", 96_000_000},
{:biology, "How many times does the average human blink per day?", 25_000},
{:biology, "How many sweat glands does one square inch of human skin contain?", 625},
{:biology, "What percentage of an eggs weight is the shell?", 12},
{:biology, "What is the longest time a person has been in a coma, in years?", 37},
{:biology, "What is the farthest distance a shark can sense a drop of blood, in meters?", 4_000},
{:biology, "How many pounds of feces does an average elephant produce every day?", 50},
{:biology, "How many known species of ladybugs are there?", 4_300},
{:biology, "How many times a second does a house fly flap it's wing?", 200},
{:biology, "How many times a second can a woodpecker peck?", 20},
{:biology, "How many known species of insects are there?", 900_000},
{:geography, "How many sheep are in New Zealand?", 70_000_000},
{:geography, "As of 2016, how many cities, municipalities, districts, towns, townships, villages and hamlets does Canada have?", 5_162},
{:geography, "What was the population of Mexico City in 2010?", 8_851_080},
{:geography, "How many time zones does Russia span?", 11},
{:geography, "What percent of Canada is covered with fresh water?", 9},
{:geography, "How many lakes does Canada have?", 561},
{:geography, "How many countries border China?", 14},
{:geography, "How many rivers does Jamaica have?", 120},
{:geography, "How long is The Great Wall of China, in kilometres?", 6_430},
{:geography, "How many countries does Germany border?", 9},
{:geography, "How many bathtubs could Niagara Falls fill every second?", 4_000},
{:geography, "How tall is Mount Everest, in meters?", 8_848},
{:geography, "How old was the oldest person to climb Mount Everest?", 80},
{:geography, "How old was the youngest person to climb Mount Everest?", 13},
{:history, "How old was Sir Isaac Newton when he discovered the law of gravity?", 23},
{:history, "In what year was the first full length animated film released?", 1937},
{:history, "In what year was volleyball invented?", 1895},
{:history, "In what year was instant coffee invented?", 1901},
{:history, "In what year was Pez invented?", 1927},
{:meteorology, "On average, how many times does lightning strike Earth every minute?", 6_000},
{:mathematics, "How many digits does the largest prime number known have (as of December 2017)?", 22_338_618},
{:pop_culture, "How many stars are in the Paramount studios logo?", 22},
{:pop_culture, "In how many weeks was the movie Wayne's World filmed?", 2},
{:pop_culture, "What percentage of movies are rated R?", 55},
{:pop_culture, "How many minutes was the Lord of the Rings trilogy (extended edition)?", 682},
{:pop_culture, "How many Academy Awards did Walt Disney win?", 22},
{:pop_culture, "How many albums did the Beatles release?", 13},
{:records, "How wide, in inches, was the largest recorded snowflake?", 15},
{:records, "How many teddy bears are there in the world's largest teddy bear collection?", 8_026},
{:records, "How much did the world's largest tape ball weigh, in kilograms?", 907},
{:records, "What is the most number of balloons blown up by an individual in one hour?", 910},
{:records, "How many millimeters was the world's longest eyelash?", 124},
{:records, "What is the most number apples bobbed in one minute by an individual?", 37},
{:records, "What's the fastest 100m slackfline walk, in seconds?", 119},
{:records, "How much did the world's largest rubber band ball weigh, in kilograms?", 4_097},
{:society, "How many homicides where committed in Canada in 2016?", 611},
{:society, "What percentage of burglaries are committed by people aged 13-21?", 80},
{:society, "How many eggs does the average American eat per year?", 263},
{:society, "What percentage of all wine is produced in Italy and France?", 40},
{:society, "How many litres of fuel does a Boeing 747 hold?", 216_847},
{:society, "How many trees worth of paper will the average American consume over their lifetime?", 465},
{:society, "What was the average lifespan in the United States in 1900?", 47},
{:sports, "How many hours did it take the first person to swim across the English Channel?", 21},
{:sports, "What's the longest winning streak in Major League Baseball?", 26},
{:sports, "How many dimples does the average golf ball have?", 336},
{:sports, "How many stitches are in an average soccer ball?", 642},
{:sports, "How many holes does a Chinese checkerboard have?", 121},
{:sports, "How old was the oldest person to play in the NHL?", 52},
{:sports, "How old was the oldest person to play in the NBA?", 45}
]

@populations [
{"China", 1_388_330_000, 2017},
{"India", 1_325_810_000, 2017},
{"United States", 326_355_000, 2017},
{"Indonesia", 261_890_900, 2017},
{"Pakistan", 210_058_000, 2017},
{"Brazil", 208_451_000, 2017},
{"Nigeria", 193_392_500, 2016},
{"Bangladesh", 163_725_000, 2017},
{"Russia", 146_867_905, 2017},
{"Japan", 126_700_000, 2017},
{"Mexico", 123_675_351, 2017},
{"Philippines", 105_087_000, 2017},
{"Egypt", 96_267_400, 2017},
{"Ethiopia", 94_352_000, 2017},
{"Vietnam", 93_700_000, 2017},
{"Germany", 82_800_000, 2016},
{"Democratic Republic of the Congo", 81_339_900, 2017},
{"Iran", 81_077_600, 2017},
{"Turkey", 79_814_871, 2016},
{"France", 67_182_000, 2017},
{"Thailand", 66_061_000, 2017},
{"United Kingdom", 65_648_000, 2016},
{"Italy", 60_501_718, 2017},
{"South Africa", 56_717_000, 2017},
{"Myanmar", 53_370_609, 2017},
{"Tanzania", 51_557_365, 2017},
{"South Korea", 51_446_201, 2017},
{"Kenya", 49_699_862, 2017},
{"Colombia", 49_559_000, 2017},
{"Spain", 46_549_045, 2017},
{"Argentina", 44_044_811, 2017},
{"Ukraine", 42_418_235, 2017},
{"Algeria", 41_697_498, 2017},
{"Sudan", 40_782_742, 2017},
{"Poland", 38_422_346, 2017},
{"Iraq", 38_274_618, 2017},
{"Uganda", 37_673_800, 2017},
{"Canada", 36_970_800, 2017},
{"Morocco", 34_534_400, 2017},
{"Saudi Arabia", 32_612_641, 2017},
{"Uzbekistan", 32_345_000, 2017},
{"Malaysia", 32_344_500, 2017},
{"Peru", 31_826_018, 2017},
{"Venezuela", 31_431_164, 2017},
{"Afghanistan", 29_724_323, 2017},
{"Ghana", 28_956_587, 2017},
{"Nepal", 28_825_709, 2017},
{"Angola", 28_359_634, 2017},
{"Yemen", 28_250_000, 2017},
{"Mozambique", 27_128_530, 2017},
{"Madagascar", 25_571_000, 2017},
{"North Korea", 25_491_000, 2017},
{"Australia", 24_761_300, 2017},
{"Ivory Coast", 24_294_750, 2017},
{"Taiwan", 23_566_853, 2017},
{"Cameroon", 23_248_044, 2017},
{"Sri Lanka", 21_444_000, 2017},
{"Niger", 20_651_070, 2017},
{"Romania", 19_638_000, 2017},
{"Burkina Faso", 19_632_147, 2017},
{"Mali", 18_542_000, 2017},
{"Syria", 18_270_000, 2017},
{"Kazakhstan", 18_117_600, 2017},
{"Chile", 17_574_003, 2017},
{"Malawi", 17_373_185, 2017},
{"Netherlands", 17_183_400, 2017},
{"Ecuador", 16_898_500, 2017},
{"Zambia", 16_405_229, 2017},
{"Guatemala", 16_176_133, 2015},
{"Cambodia", 15_848_495, 2017},
{"Senegal", 15_256_346, 2017},
{"Chad", 14_900_000, 2017},
{"Somalia", 14_742_523, 2017},
{"Zimbabwe", 14_542_235, 2017},
{"South Sudan", 11_868_209, 2017},
{"Rwanda", 11_809_300, 2017},
{"Guinea", 11_702_692, 2017},
{"Tunisia", 11_446_300, 2017},
{"Belgium", 11_392_068, 2017},
{"Cuba", 11_239_224, 2016},
{"Bolivia", 11_145_770, 2017},
{"Benin", 11_002_578, 2017},
{"Haiti", 10_911_819, 2015},
{"Greece", 10_768_193, 2017},
{"Czech Republic", 10_597_473, 2017},
{"Burundi", 10_400_938, 2017},
{"Portugal", 10_309_573, 2016},
{"Dominican Republic", 10_169_172, 2017},
{"Sweden", 10_103_843, 2017},
{"Jordan", 10_041_080, 2017},
{"Azerbaijan", 9_867_250, 2017},
{"Hungary", 9_799_00, 2017},
{"Belarus", 9_495_800, 2017},
{"United Arab Emirates", 9_400_000, 2017},
{"Honduras", 8_866_351, 2017},
{"Tajikistan", 8_829_300, 2017},
{"Austria", 8_817_514, 2017},
{"Israel", 8_792_380, 2017},
{"Switzerland", 8_465_234, 2017},
{"Papua New Guinea", 8_151_300, 2016},
{"Togo", 7_178_000, 2017},
{"Bulgaria", 7_101_859, 2016},
{"Sierra Leone", 7_092_113, 2015},
{"Serbia", 7_058_322, 2016},
{"Paraguay", 6_953_64, 2017},
{"El Salvador", 6_581_940, 2017},
{"Laos", 6_492_400, 2015},
{"Libya", 6_374_616, 2017},
{"Nicaragua", 6_305_956, 2017},
{"Kyrgyzstan", 6_140_20, 2017},
{"Lebanon", 6_082_000, 2017},
{"Denmark", 5_778_570, 2017},
{"Turkmenistan", 5_758_000, 2017},
{"Singapore", 5_612_300, 2017},
{"Finland", 5_509_984, 2017},
{"Slovakia", 5_441_899, 2017},
{"Norway", 5_290_288, 2017},
{"Costa Rica", 4_947_490, 2017},
{"New Zealand", 4_842_730, 2017},
{"Palestine", 4_816_503, 2016},
{"Ireland", 4_792_500, 2017},
{"Central African Republic", 4_659_080, 2017},
{"Oman", 4_639_678, 2017},
{"Liberia", 4_289_520, 2017},
{"Croatia", 4_154_213, 2016},
{"Kuwait", 4_132_415, 2016},
{"Panama", 4_098_135, 2017},
{"Moldova", 3_550_90, 2017},
{"Bosnia and Herzegovina", 3_518_000, 2015},
{"Uruguay", 3_493_205, 2017},
{"Mongolia", 3_187_075, 2017},
{"Armenia", 2_979_600, 2017},
{"Albania", 2_876_59, 2017},
{"Lithuania", 2_810_865, 2017},
{"Jamaica", 2_730_894, 2016},
{"Qatar", 2_634_234, 2017},
{"Namibia", 2_368_747, 2017},
{"Botswana", 2_230_905, 2016},
{"Macedonia", 2_073_702, 2016},
{"Slovenia", 2_065_89, 2017},
{"Latvia", 1_931_200, 2017},
{"Kosovo", 1_783_531, 2016},
{"Bahrain", 1_451_200, 2017},
{"Trinidad and Tobago", 1_356_633, 2017},
{"Estonia", 1_352_32, 2017},
{"Swaziland", 1_145_970, 2017},
{"Fiji", 869_458, 2015},
{"Cyprus", 854_800, 2016},
{"Bhutan", 794_950, 2017},
{"Guyana", 777_859, 2017},
{"Montenegro", 622_38, 2017},
{"Luxembourg", 590_66, 2017},
{"Cape Verde", 537_661, 2017},
{"Malta", 434_403, 2015},
{"Brunei", 417_200, 2015},
{"Belize", 380_010, 2016},
{"Bahamas", 378_040, 2016},
{"Iceland", 346_750, 2017},
{"Barbados", 285_719, 2017},
{"Samoa", 196_31, 2017},
{"Federated States of Micronesia", 104_600, 2016},
{"Grenada", 103_328, 2011},
{"Tonga", 100_600, 2016},
{"Antigua and Barbuda", 86_295, 2011},
{"Andorra", 78_264, 2016},
{"Monaco", 37_550, 2016},
{"Vatican City", 80, 2014}
]

@gdp_per_capita_in_usd_world_bank_2016 [
{"Qatar", 127_523},
{"Luxembourg", 105_882},
{"Macau", 104_169},
{"Singapore", 87_856},
{"Brunei", 77_441},
{"United Arab Emirates", 72_419},
{"Ireland", 68_883},
{"Switzerland", 62_882},
{"Norway", 59_302},
{"Hong Kong", 58_553},
{"United States", 57_467},
{"Saudi Arabia", 54_431},
{"Iceland", 51_399},
{"Netherlands", 50_898},
{"Austria", 50_078},
{"Denmark", 49_496},
{"Sweden", 49_175},
{"Germany", 48_730},
{"Australia", 46_790},
{"Belgium", 46_383},
{"Canada", 44_025},
{"Finland", 43_053},
{"United Kingdom", 42_609},
{"Japan", 41_470},
{"France", 41_466},
{"New Zealand", 39_059},
{"Italy", 38_161},
{"Israel", 37_901},
{"Malta", 37_899},
{"Spain", 36_310},
{"South Korea", 35_751},
{"Czech Republic", 34_711},
{"Slovenia", 32_885},
{"Cyprus", 32_580},
{"Trinidad and Tobago", 31_908},
{"Slovakia", 30_632},
{"Portugal", 30_624},
{"Lithuania", 29_966},
{"Estonia", 29_365},
{"Poland", 27_811},
{"Malaysia", 27_681},
{"Greece", 26_783},
{"Hungary", 26_681},
{"Latvia", 26_031},
{"Equatorial Guinea", 25_535},
{"Kazakhstan", 25_264},
{"Turkey", 24_244},
{"Chile", 23_960},
{"Romania", 23_626},
{"Croatia", 23_596},
{"Bahamas, The", 23_173},
{"Russia", 23_163},
{"Panama", 23_015},
{"Antigua and Barbuda", 22_414},
{"Uruguay", 21_625},
{"Mauritius", 21_088},
{"Argentina", 19_934},
{"Bulgaria", 19_199},
{"Belarus", 18_060},
{"Mexico", 17_862},
{"Iraq", 17_354},
{"Azerbaijan", 17_253},
{"Thailand", 16_917},
{"Turkmenistan", 16_881},
{"Montenegro", 16_854},
{"Barbados", 16_816},
{"Botswana", 16_735},
{"Costa Rica", 16_614},
{"World", 16_136},
{"China", 15_535},
{"Palau", 15_373},
{"Dominican Republic", 15_209},
{"Brazil", 15_128},
{"Macedonia", 15_121},
{"Algeria", 15_075},
{"Serbia", 14_512},
{"Colombia", 14_158},
{"Suriname", 14_146},
{"Lebanon", 13_996},
{"Grenada", 13_928},
{"South Africa", 13_225},
{"Maldives", 13_199},
{"Peru", 13_022},
{"Sri Lanka", 12_316},
{"Mongolia", 12_220},
{"Bosnia and Herzegovina", 12_075},
{"Albania", 11_929},
{"Indonesia", 11_612},
{"Tunisia", 11_599},
{"Ecuador", 11_286},
{"Egypt", 11_132},
{"Dominica", 10_975},
{"Namibia", 10_585},
{"Kosovo", 10_066},
{"Georgia", 9_997},
{"Paraguay", 9_577},
{"Fiji", 9_561},
{"Jordan", 9_050},
{"Jamaica", 8_835},
{"Armenia", 8_818},
{"Bhutan", 8_744},
{"El Salvador", 8_619},
{"Belize", 8_448},
{"Swaziland", 8_343},
{"Ukraine", 8_272},
{"Guatemala", 7_947},
{"Morocco", 7_838},
{"Guyana", 7_819},
{"Philippines", 7_806},
{"Bolivia", 7_236},
{"India", 6_572},
{"Cape Verde", 6_553},
{"Uzbekistan", 6_514},
{"Angola", 6_499},
{"Vietnam", 6_424},
{"Samoa", 6_345},
{"Laos", 6_186},
{"Nigeria", 5_867},
{"Myanmar", 5_773},
{"Tonga", 5_752},
{"Nicaragua", 5_541},
{"Moldova", 5_334},
{"Pakistan", 5_249},
{"Honduras", 4_738},
{"Sudan", 4_730},
{"Ghana", 4_294},
{"Zambia", 3_922},
{"Cambodia", 3_736},
{"Côte d'Ivoire", 3_720},
{"Bangladesh", 3_581},
{"Kyrgyzstan", 3_551},
{"Cameroon", 3_286},
{"Kenya", 3_156},
{"Tajikistan", 2_980},
{"Tanzania", 2_787},
{"Senegal", 2_568},
{"Yemen", 2_508},
{"Nepal", 2_468},
{"Benin", 2_168},
{"Mali", 2_117},
{"Zimbabwe", 2_006},
{"Chad", 1_991},
{"Rwanda", 1_913},
{"Afghanistan", 1_877},
{"Uganda", 1_849},
{"Haiti", 1_784},
{"Ethiopia", 1_735},
{"Burkina Faso", 1_720},
{"Madagascar", 1_506},
{"Togo", 1_491},
{"Sierra Leone", 1_473},
{"Guinea", 1_311},
{"Mozambique", 1_217},
{"Malawi", 1_169},
{"Niger", 978},
{"Liberia", 813},
{"Democratic Republic of the Congo", 801},
{"Burundi", 778},
{"Central African Republic", 699}
]

@planet_diameters_in_km [
{"Jupiter", 142_800},
{"Saturn", 120_660},
{"Uranus", 51_118},
{"Neptune", 49_528},
{"Earth", 12_756},
{"Venus", 12_104},
{"Mars", 6787},
{"Mercury", 4_879},
{"Pluto", 2_300}
]

@planet_distances_from_sun_in_km [
{"Mercury", 57_910_000},
{"Venus", 108_200_000},
{"Earth", 149_600_000},
{"Mars", 227_940_000},
{"Jupiter", 778_330_000},
{"Saturn", 1_424_600_000},
{"Uranus", 2_873_550_000},
{"Neptune", 4_501_000_000},
{"Pluto", 5_945_900_000}
]

@planet_orbit_durations [
{"Mercury", 88, "days"},
{"Venus", 225, "days"},
{"Mars", 697, "days"},
{"Jupiter", 11, "years"},
{"Saturn", 29, "years"},
{"Uranus", 84, "years"},
{"Neptune", 165, "years"},
{"Pluto", 248, "years"}
]

@novel_word_counts [
{"Harry Potter and the Philosopher’s Stone", 77_325},
{"The Hobbit", 95_022},
{"The Lord of the Rings", 455_125},
{"The Two Towers", 143_436},
{"The Return of the King", 134_462},
{"Charlie and the Chocolate Factory", 30_644},
{"The Great Gatsby", 47_094},
{"Lord of the Flies", 59_900},
{"Brave New World", 63_766},
{"The Catcher in the Rye", 73_404},
{"Nineteen Eighty-Four", 88_942},
{"Gullivers Travels", 107_349},
{"Wuthering Heights", 107_945},
{"The Adventures of Huckleberry Finn", 109_571},
{"A Tale of Two Cities", 135_420},
{"20000 Leagues Under the Sea", 138_138},
{"Jane Eyre", 183_858},
{"Moby Dick", 206_052},
{"War and Peace", 587_287}
]

@academy_awards_won_by_movie [
{"Ben-Hur", 11},
{"Titanic", 11},
{"The Lord of the Rings: The Return of the King", 11},
{"West Side Story", 10},
{"The Last Emperor", 9},
{"The English Patient", 9},
{"Gone with the Wind", 8},
{"My Fair Lady", 8},
{"Gandhi", 8},
{"Amadeus", 8},
{"Slumdog Millionaire", 8},
{"Lawrence of Arabia", 7},
{"Dances with Wolves", 7},
{"Schindler's List", 7},
{"Shakespeare in Love", 7},
{"Gravity", 7},
{"Star Wars", 6},
{"Forrest Gump", 6},
{"The Hurt Locker", 6},
{"Mad Max: Fury Road", 6},
{"La La Land", 6},
{"The Silence of the Lambs", 5},
{"Braveheart", 5},
{"American Beauty", 5}
]

@fastest_production_cars_km_h_year [
{"Benz Velo", 20, 1894},
{"Jaguar XK120", 200, 1949},
{"Mercedes-Benz 300SL", 242, 1955},
{"Aston Martin DB4 GT", 245, 1959},
{"Iso Grifo GL 365", 259, 1963},
{"AC Cobra Mk III 427", 266, 1965},
{"Lamborghini Miura P400", 275, 1967},
{"Ferrari 365 GTB/4 Daytona", 280, 1968},
{"Lamborghini Miura P400S", 288, 1969},
{"Lamborghini Countach LP500 S", 293, 1982},
{"Ferrari 288 GTO", 303, 1984},
{"Porsche 959", 319, 1986},
{"Ruf CTR", 342, 1987},
{"McLaren F1", 355, 1993},
{"Bugatti Veyron EB 16.4", 408, 2005},
{"Bugatti Veyron 16.4 Super Sport", 415, 2010}
]

@inventions [
{"printing press", 1439},
{"double-entry bookkeeping system", 1494},
{"Mercator Projection map", 1569},
{"newspaper", 1577},
{"internal fuse time bomb", 1592},
{"telescope", 1608},
{"compound microscope", 1620},
{"slide rule", 1630},
{"mechanical calculator", 1642},
{"barometer", 1643},
{"vacuum pump", 1650},
{"pendulum clock", 1656},
{"piston engine", 1680},
{"piano", 1700},
{"alcohol thermometer", 1709},
{"spinning jenny", 1764},
{"steam-powered car", 1769},
{"weighing scale", 1770},
{"modern screw-cutting lathe", 1775},
{"mechanical air compressor", 1776},
{"steamboat", 1783},
{"power loom", 1789},
{"sewing machine", 1790},
{"modern cotton gin", 1793},
{"lithography printing technique", 1796},
{"hydraulic press", 1795},
{"smallpox vaccine", 1798},
{"motorized air compressor", 1799},
{"steam locomotive", 1804},
{"internal combustion engine", 1807},
{"canning process for food", 1810},
{"powered printing press", 1811},
{"electric telegraph", 1816},
{"programmable mechanical computer", 1822},
{"bolt-action rifle", 1824},
{"electromagnet", 1825},
{"compound air compressor", 1829},
{"lawn mower", 1830},
{"electric motor", 1834},
{"fuel cell", 1842},
{"pneumatic drill", 1848},
{"safety brake elevator", 1852},
{"rechargeable battery", 1859},
{"pasteurization process", 1864},
{"metal detector", 1874},
{"telephone", 1876},
{"phonograph", 1877},
{"incandescent light bulb", 1879},
{"modern steam turbine", 1884},
{"modern bicycle", 1885},
{"gas-powered car", 1886},
{"ballpoint pen", 1888},
{"zipper.", 1891},
{"cinematograph.", 1892},
{"diesel engine", 1893},
{"nickel–cadmium battery", 1899},
{"zeppelin", 1900},
{"vacuum cleaner", 1901},
{"gas turbine", 1903},
{"tank", 1915},
{"quartz clock", 1927},
{"turbo-jet engine", 1928},
{"electron microscope", 1931},
{"electric current defibrillator", 1939},
{"ejector seat", 1946},
{"hologram", 1947},
{"transistor", 1947},
{"atomic clock", 1948},
{"video tape recorder", 1953},
{"solar battery", 1954},
{"hovercraft", 1955},
{"hard disk drive", 1956},
{"integrated circuit", 1958},
{"laser", 1960},
{"electronic cigarette", 1963},
{"pocket calculator", 1970},
{"capacitive touchscreen", 1973},
{"CD-ROM", 1982},
{"electric toothbrush", 1939},
{"doorbell", 1831},
{"tea bag", 1908},
{"revolving door", 1888},
{"lie detector", 1921},
{"drinking straw", 1886},
{"elevator", 1850},
{"toothbrush", 1498},
{"corkscrew", 1890},
{"typewriter", 1829},
{"dishwasher", 1889},
{"wristwatch", 1904}
]

@most_foods_eaten [
{"chicken nuggets", "3 minutes", 37},
{"grilled cheese sandwiches", "1 minute", 13},
{"hamburgers", "3 minutes", 12},
{"grapes", "3 minutes", 205},
{"olives", "1 minute", 60},
{"grams of mashed potatoes", "30 seconds", 598},
{"pancakes", "8 minutes", 113},
{"twinkies", "6 minutes", 121},
{"slices of bacon", "5 minutes", 182},
{"waffles", "10 minutes", 29}
]

@fastest_food_eaten_in_seconds [
{"a 12 inch pizza", 32},
{"10 ghost peppers", 30},
{"6 pounds of baked beans", 108},
{"a 22 ounce 7-Eleven Slurpee", 9}
]

@fastest_races_in_seconds [
{"400 meters", 43},
{"800 meters", 100},
{"1000 meters", 131},
{"1500 meters", 206},
{"1 mile", 223},
{"2000 meters", 284},
{"3000 meters", 440},
{"5000 meters", 757}
]

@mercer_2017_quality_of_living_rankings [
{"Vienna", "Austria", 1},
{"Zurich", "Switzerland", 2},
{"Auckland", "New Zealand", 3},
{"Munich", "Germany", 4},
{"Vancouver", "Canada", 5},
{"Dusseldorf", "Germany", 6},
{"Frankfurt", "Germany", 7},
{"Geneva", "Switzerland", 8},
{"Copenhagen", "Denmark", 9},
{"Basel", "Switzerland", 10},
{"Sydney", "Australia", 10},
{"Amsterdam", "Netherlands", 12},
{"Berlin", "Germany", 13},
{"Bern", "Switzerland", 14},
{"Wellington", "New Zealand", 15},
{"Melbourne", "Australia", 16},
{"Toronto", "Canada", 16},
{"Ottawa", "Canada", 18},
{"Hamburg", "Germany", 19},
{"Stockholm", "Sweden", 20},
{"Luxembourg", "Luxembourg", 21},
{"Perth", "Australia", 22},
{"Montreal", "Canada", 23},
{"Nurnberg", "Germany", 24},
{"Singapore", "Singapore", 25},
{"Stuttgart", "Germany", 26},
{"Brussels", "Belgium", 27},
{"Adelaide", "Australia", 28},
{"Canberra", "Australia", 29},
{"San Francisco, CA", "United States", 29},
{"Helsinki", "Finland", 31},
{"Oslo", "Norway", 31},
{"Calgary", "Canada", 33},
{"Dublin", "Ireland", 34},
{"Boston, MA", "United States", 35},
{"Honolulu, HI", "United States", 36},
{"Brisbane", "Australia", 37},
{"Paris", "France", 38},
{"Lyon", "France", 39},
{"London", "United Kingdom", 40},
{"Milan", "Italy", 41},
{"Barcelona", "Spain", 42},
{"Lisbon", "Portugal", 43},
{"New York City, NY", "United States", 44},
{"Edinburgh", "United Kingdom", 45},
{"Seattle, WA", "United States", 45},
{"Chicago, IL", "United States", 47},
{"Tokyo", "Japan", 47},
{"Washington, DC", "United States", 49},
{"Kobe", "Japan", 50},
{"Madrid", "Spain", 51},
{"Yokohama", "Japan", 51},
{"Birmingham", "United Kingdom", 53},
{"Glasgow", "United Kingdom", 53},
{"Pittsburgh, PA", "United States", 55},
{"Philadelphia, PA", "United States", 56},
{"Rome", "Italy", 57},
{"Aberdeen", "United Kingdom", 58},
{"Los Angeles, CA", "United States", 58},
{"Osaka", "Japan", 60},
{"Leipzig", "Germany", 61},
{"Minneapolis, MN", "United States", 62},
{"Nagoya", "Japan", 63},
{"Dallas, TX", "United States", 64},
{"Atlanta, GA", "United States", 65},
{"Belfast", "United Kingdom", 66},
{"Houston, TX", "United States", 67},
{"Miami, FL", "United States", 68},
{"Prague", "Czech Republic", 69},
{"St. Louis, MO", "United States", 70},
{"Detroit, MI", "United States", 71},
{"Hong Kong", "Hong Kong", 71},
{"Pointe-a-Pitre", "Guadeloupe", 73},
{"Dubai", "United Arab Emirates", 74},
{"San Juan", "Puerto Rico", 75},
{"Ljubljana", "Slovenia", 76},
{"Seoul", "South Korea", 76},
{"Budapest", "Hungary", 78},
{"Abu Dhabi", "United Arab Emirates", 79},
{"Montevideo", "Uruguay", 79},
{"Vilnius", "Lithuania", 81},
{"Warsaw", "Poland", 81},
{"Bratislava", "Slovakia", 83},
{"Port Louis", "Mauritius", 84},
{"Taipei", "Taiwan", 85},
{"Kuala Lumpur", "Malaysia", 86},
{"Athens", "Greece", 87},
{"Durban", "South Africa", 87},
{"Limassol", "Cyprus", 89},
{"Tallinn", "Estonia", 89},
{"Riga", "Latvia", 91},
{"Busan", "South Korea", 92},
{"Buenos Aires", "Argentina", 93},
{"Cape Town", "South Africa", 94},
{"Santiago", "Chile", 95},
{"Johannesburg", "South Africa", 96},
{"Panama City", "Panama", 97},
{"Victoria", "Seychelles", 98},
{"Zagreb", "Croatia", 98},
{"Wroclaw", "Poland", 100},
{"Taichung", "Taiwan", 101},
{"Shanghai", "China", 102},
{"Johor Bahru", "Malaysia", 103},
{"Bandar Seri Begawan", "Brunei", 104},
{"Tel Aviv", "Israel", 105},
{"Muscat", "Oman", 106},
{"Bucharest", "Romania", 107},
{"Doha", "Qatar", 108},
{"Brasilia", "Brazil", 109},
{"Monterrey", "Mexico", 110},
{"San Jose", "Costa Rica", 110},
{"Noumea", "New Caledonia", 112},
{"Nassau", "Bahamas", 113},
{"Tunis", "Tunisia", 114},
{"Asuncion", "Paraguay", 115},
{"Sofia", "Bulgaria", 116},
{"Rabat", "Morocco", 117},
{"Rio de Janeiro", "Brazil", 118},
{"Amman", "Jordan", 119},
{"Beijing", "China", 119},
{"Guangzhou", "China", 121},
{"Quito", "Ecuador", 121},
{"Sao Paulo", "Brazil", 121},
{"Lima", "Peru", 124},
{"Casablanca", "Morocco", 125},
{"Kuwait City", "Kuwait", 126},
{"Manaus", "Brazil", 127},
{"Mexico City", "Mexico", 128},
{"Bogota", "Colombia", 129},
{"Windhoek", "Namibia", 130},
{"Bangkok", "Thailand", 131},
{"Colombo", "Sri Lanka", 132},
{"Istanbul", "Turkey", 133},
{"Manama", "Bahrain", 134},
{"Manila", "Philippines", 135},
{"Shenzhen", "China", 136},
{"Chengdu", "China", 137},
{"Belgrade", "Serbia", 138},
{"Santo Domingo", "Dominican Republic", 139},
{"Nanjing", "China", 140},
{"Gaborone", "Botswana", 141},
{"Xian", "China", 141},
{"Jakarta", "Indonesia", 143},
{"Hyderabad", "India", 144},
{"Pune", "India", 145},
{"Bangalore", "India", 146},
{"Chongqing", "China", 147},
{"Port of Spain", "Trinidad & Tobago", 147},
{"Qingdao", "China", 149},
{"Lusaka", "Zambia", 150},
{"Chennai", "India", 151},
{"Ho Chi Minh City", "Vietnam", 152},
{"Kingston", "Jamaica", 153},
{"Mumbai", "India", 154},
{"Guatemala City", "Guatemala", 155},
{"Hanoi", "Vietnam", 156},
{"La Paz", "Bolivia", 157},
{"Shenyang", "China", 158},
{"Sarajevo", "Bosnia-Herzegovina", 159},
{"Kolkata", "India", 160},
{"New Delhi", "India", 161},
{"Skopje", "Macedonia", 161},
{"Dakar", "Senegal", 163},
{"Libreville", "Gabon", 164},
{"Cairo", "Egypt", 165},
{"Accra", "Ghana", 166},
{"Riyadh", "Saudi Arabia", 166},
{"Moscow", "Russia", 168},
{"Jeddah", "Saudi Arabia", 169},
{"Jilin", "China", 170},
{"Vientiane", "Laos", 171},
{"Yerevan", "Armenia", 172},
{"Kampala", "Uganda", 173},
{"Kiev", "Ukraine", 174},
{"Managua", "Nicaragua", 174},
{"St. Petersburg", "Russia", 176},
{"Tirana", "Albania", 176},
{"Almaty", "Kazakhstan", 178},
{"Blantyre", "Malawi", 179},
{"Beirut", "Lebanon", 180},
{"Cotonou", "Benin", 181},
{"Maputo", "Mozambique", 181},
{"San Salvador", "El Salvador", 183},
{"Algiers", "Algeria", 184},
{"Banjul", "Gambia", 185},
{"Nairobi", "Kenya", 186},
{"Tbilisi", "Georgia", 187},
{"Tegucigalpa", "Honduras", 188},
{"Caracas", "Venezuela", 189},
{"Djibouti", "Djibouti", 189},
{"Minsk", "Belarus", 189},
{"Havana", "Cuba", 192},
{"Kigali", "Rwanda", 192},
{"Islamabad", "Pakistan", 194},
{"Yaounde", "Cameroon", 194},
{"Baku", "Azerbaijan", 196},
{"Douala", "Cameroon", 196},
{"Phnom Penh", "Cambodia", 198},
{"Dar Es Salaam", "Tanzania", 199},
{"Tehran", "Iran", 199},
{"Luanda", "Angola", 201},
{"Lahore", "Pakistan", 202},
{"Yangon", "Myanmar", 203},
{"Karachi", "Pakistan", 204},
{"Tashkent", "Uzbekistan", 205},
{"Lome", "Togo", 206},
{"Bishkek", "Kyrgyzstan", 207},
{"Abidjan", "Côte D'Ivoire", 208},
{"Addis Ababa", "Ethiopia", 209},
{"Harare", "Zimbabwe", 210},
{"Ashkhabad", "Turkmenistan", 211},
{"Lagos", "Nigeria", 212},
{"Abuja", "Nigeria", 213},
{"Dhaka", "Bangladesh", 214},
{"Dushanbe", "Tajikistan", 215},
{"Antananarivo", "Madagascar", 216},
{"Ouagadougou", "Burkina Faso", 217},
{"Tripoli", "Libya", 218},
{"Niamey", "Niger", 219},
{"Bamako", "Mali", 220},
{"Nouakchott", "Mauritania", 221},
{"Conakry", "Guinea", 222},
{"Kinshasa", "Congo", 223},
{"Brazzaville", "Congo", 224},
{"Damascus", "Syria", 225},
{"N'djamena", "Chad", 226},
{"Khartoum", "Sudan", 227},
{"Port au Prince", "Haiti", 228},
{"Sana'a", "Yemen", 229},
{"Bangui", "Central African Republic", 230},
{"Baghdad", "Iraq", 231}
]

  def random do
    YouBet.Chooser.choose([
      {20, &one_off/0},
      {10, &country_population/0},
      {5, &gdp_per_capita/0},
      {5, &size_of_planet/0},
      {3, &distance_from_sun/0},
      {5, &orbit_duration/0},
      {2, &novel_word_count/0},
      {3, &academy_awards/0},
      {2, &top_speed_of_car/0},
      {10, &when_invented/0},
      {2, &most_food_eaten/0},
      {1, &fastest_eaten/0},
      {2, &fastest_run/0},
      {5, &quality_of_living/0},
    ])
  end

  defp one_off do
    {_topic, question, answer} = Enum.random(@one_off_questions)
    {question, answer}
  end

  defp country_population do
    {country, population, year} = Enum.random(@populations)
    {"What was the population of " <> country <> " in " <> Integer.to_string(year) <> "?", population}
  end

  defp gdp_per_capita do
    {country, gdp} = Enum.random(@gdp_per_capita_in_usd_world_bank_2016)
    {"What is the GDP per capita of " <> country <> " in 2016?", gdp}
  end

  defp size_of_planet do
    {planet, diameter} = Enum.random(@planet_diameters_in_km)
    {"What is the diameter of " <> planet <> " in kilometres?", diameter}
  end

  defp distance_from_sun do
    {planet, distance} = Enum.random(@planet_distances_from_sun_in_km)
    {"What is the distance between " <> planet <> " and the Sun, in kilometres?", distance}
  end

  defp orbit_duration do
    {planet, num, units} = Enum.random(@planet_orbit_durations)
    {"How many " <> units <> " does it take " <> planet <> " to orbit the Sun?", num}
  end

  defp novel_word_count do
    {novel, word_count} = Enum.random(@novel_word_counts)
    {"How many words are in the novel " <> novel <> "?", word_count}
  end

  defp academy_awards do
    {movie, awards} = Enum.random(@academy_awards_won_by_movie)
    {"How many Academy Awards did " <> movie <> " win?", awards}
  end

  defp top_speed_of_car do
    {car, speed, year} = Enum.random(@fastest_production_cars_km_h_year)
    {"In " <> Integer.to_string(year) <> ", the " <> car <> " was the fastest production car. What was it's top speed in kilometres per hour?", speed}
  end

  defp when_invented do
    {invention, year} = Enum.random(@inventions)
    {"In what year was the " <> invention <> " invented?", year}
  end

  defp most_food_eaten do
    {food, duration, number} = Enum.random(@most_foods_eaten)
    {"What was the most " <> food <> " eaten in " <> duration <> " by a person?", number}
  end

  defp fastest_eaten do
    {food, seconds} = Enum.random(@fastest_food_eaten_in_seconds)
    {"What is the fastest time, in seconds, a person has consumed " <> food <> "?", seconds}
  end

  defp fastest_run do
    {distance, seconds} = Enum.random(@fastest_races_in_seconds)
    {"What is the fastest time, in seconds, a human has run " <> distance <> "?", seconds}
  end

  defp quality_of_living do
    {city, country, rank} = Enum.random(@mercer_2017_quality_of_living_rankings)
    {"According to the 2017 Mercer Quality of Living Ranking, out of 231 cities, with 1 being the best and 231 being the worst, where did " <> city <> ", " <> country <> " rank?", rank}
  end
end