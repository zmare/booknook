const books = [
    {
        author: "Suzanne Collins",
        title: "The Hunger Games",
        ISBN: 9780439023481,
        summary: "In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg"
    },
    {
        author: "Jane Austen",
        title: "Pride and Prejudice",
        ISBN: 9780679783268,
        summary: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child' and its vivacious heroine, Elizabeth Bennet, 'as delightful a creature as ever appeared in print.' The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austen's radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg"
    },
    {
        author: "Harper Lee",
        title: "To Kill a Mockingbird",
        ISBN: 9781439550410,
        summary: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic. Compassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg"
    },
    {
        author: "Markus Zusak",
        title: "The Book Thief",
        ISBN: 9781101934180,
        summary: "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still. By her brother's graveside, Liesel's life is changed when she picks up a single object, partially hidden in the snow. It is The Gravedigger's Handbook, left behind there by accident, and it is her first act of book thievery. So begins a love affair with books and words, as Liesel, with the help of her accordian-playing foster father, learns to read. Soon she is stealing books from Nazi book-burnings, the mayor's wife's library, wherever there are books to be found. But these are dangerous times. When Liesel's foster family hides a Jew in their basement, Liesel's world is both opened up, and closed down. In superbly crafted writing that burns with intensity, award-winning author Markus Zusak has given us one of the most enduring stories of our time.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1181145582i/1118668.jpg"
    },
    {
        author: "George Orwell",
        title: "Animal Farm",
        ISBN: 9780451526342,
        summary: "A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned –a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible. When Animal Farm was first published, Stalinist Russia was seen as its target. Today it is devastatingly clear that wherever and whenever freedom is attacked, under whatever banner, the cutting clarity and savage comedy of George Orwell’s masterpiece have a meaning and message still ferociously fresh.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1325861570i/170448.jpg"

    },
    {
        author: "Margaret Mitchell",
        title: "Gone with the Wind",
        ISBN: 9780684826257,
        summary: "Scarlett O'Hara, the beautiful, spoiled daughter of a well-to-do Georgia plantation owner, must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1551144577i/18405.jpg"
    },
    {
        author: "Shel SilverStein",
        title: "The Giving Tree",
        ISBN: 9780060256654,
        summary: "'Once there was a tree...and she loved a little boy.' So begins a story of unforgettable perception, beautifully written and illustrated by the gifted and versatile Shel Silverstein. Every day the boy would come to the tree to eat her apples, swing from her branches, or slide down her trunk...and the tree was happy. But as the boy grew older he began to want more from the tree, and the tree gave and gave and gave.This is a tender story, touched with sadness, aglow with consolation. Shel Silverstein has created a moving parable for readers of all ages that offers an affecting interpretation of the gift of giving and a serene acceptance of another's capacity to love in return.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1174210942i/370493.jpg"
    },
    {
        author: "Emily Brontë",
        title: "Wuthering Heights",
        ISBN: 9780141439556,
        summary: "Lockwood, the new tenant of Thrushcross Grange, situated on the bleak Yorkshire moors, is forced to seek shelter one night at Wuthering Heights, the home of his landlord. There he discovers the history of the tempestuous events that took place years before; of the intense relationship between the gypsy foundling Heathcliff and Catherine Earnshaw; and how Catherine, forced to choose between passionate, tortured Heathcliff and gentle, well-bred Edgar Linton, surrendered to the expectations of her class. As Heathcliff's bitterness and vengeance at his betrayal is visited upon the next generation, their innocent heirs must struggle to escape the legacy of the past.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1643969255i/348914.jpg"
    },
    {
        author: "Oscar Wilde",
        title: 'The Picture of Dorian Gray',
        ISBN: 9780141439570,
        summary: "Oscar Wilde’s only novel is the dreamlike story of a young man who sells his soul for eternal youth and beauty.In this celebrated work Wilde forged a devastating portrait of the effects of evil and debauchery on a young aesthete in late-19th-century England. Combining elements of the Gothic horror novel and decadent French fiction, the book centers on a striking premise: As Dorian Gray sinks into a life of crime and gross sensuality, his body retains perfect youth and vigor while his recently painted portrait grows day by day into a hideous record of evil, which he must keep hidden from the world. For over a century, this mesmerizing tale of horror and suspense has enjoyed wide popularity. It ranks as one of Wilde's most important creations and among the classic achievements of its kind.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546103428i/5297.jpg"
    },
    {
        author: "Charlotte Brontë",
        title: "Jane Eyre",
        ISBN: 9780142437209,
        summary: "Orphaned as a child, Jane has felt an outcast her whole young life. Her courage is tested once again when she arrives at Thornfield Hall, where she has been hired by the brooding, proud Edward Rochester to care for his ward Adèle. Jane finds herself drawn to his troubled yet kind spirit. She falls in love. Hard. But there is a terrifying secret inside the gloomy, forbidding Thornfield Hall.Is Rochester hiding from Jane? Will Jane be left heartbroken and exiled once again?",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1557343311i/10210.jpg"
    },
    {
        author: "Stephen Chbosky",
        title: "The Perks of Being a Wallflower",
        ISBN: 9781982110994,
        summary: "The critically acclaimed debut novel from Stephen Chbosky follows observant “wallflower” Charlie as he charts a course through the strange world between adolescence and adulthood. First dates, family drama, and new friends. Sex, drugs, and The Rocky Horror Picture Show. Devastating loss, young love, and life on the fringes. Caught between trying to live his life and trying to run from it, Charlie must learn to navigate those wild and poignant roller-coaster days known as growing up.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564499095l/49623822.jpg"
    },
    {
        author: "Dan Brown",
        title: "The Da Vinci Code",
        ISBN: 9780307277671,
        summary: "While in Paris on business, Harvard symbologist Robert Langdon receives an urgent late-night phone call: the elderly curator of the Louvre has been murdered inside the museum. Near the body, police have found a baffling cipher. While working to solve the enigmatic riddle, Langdon is stunned to discover it leads to a trail of clues hidden in the works of Da Vinci — clues visible for all to see — yet ingeniously disguised by the painter.Langdon joins forces with a gifted French cryptologist, Sophie Neveu, and learns the late curator was involved in the Priory of Sion — an actual secret society whose members included Sir Isaac Newton, Botticelli, Victor Hugo, and Da Vinci, among others.In a breathless race through Paris, London, and beyond, Langdon and Neveu match wits with a faceless powerbroker who seems to anticipate their every move. Unless Langdon and Neveu can decipher the labyrinthine puzzle in time, the Priory’s ancient secret — and an explosive historical truth — will be lost forever.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597798677i/55019161.jpg"
    },
    {
        author: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        ISBN: 9780743273565,
        summary: "Jay Gatsby is the man who has everything. But one thing will always be out of his reach. Everybody who is anybody is seen at his glittering parties. Day and night his Long Island mansion buzzes with bright young things drinking, dancing, and debating his mysterious character. For Gatsby---young, handsome, and fabulously rich---always seems alone in the crowd, watching and waiting, though no one knows what for. Beneath the shimmering surface of his life he is hiding a secret: a silent longing that can never be fulfilled. And soon this destructive obsession will force his world to unravel.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1356107649i/6519719.jpg"
    },
    {
        author: "Lewis Carroll",
        title: "Alice's Adventures in Wonderland",
        ISBN: 9780451527745,
        summary: "'I can't explain myself, I'm afraid, sir,' said Alice, 'Because I'm not myself, you see.' When Alice sees a white rabbit take a watch out of its waistcoat pocket she decides to follow it, and a sequence of most unusual events is set in motion. This mini book contains the entire topsy-turvy stories of Alice's Adventures in Wonderland and Through the Looking-Glass, accompanied by practical notes and Martina Pelouso's memorable full-colour illustrations.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630487234i/24213.jpg"
    },
    {
        author: "Arthur Golden",
        title: "Memoirs of a Geisha",
        ISBN: 9781400096893,
        summary: "In 'Memoirs of a Geisha,' we enter a world where appearances are paramount; where a girl's virginity is auctioned to the highest bidder; where women are trained to beguile the most powerful men; and where love is scorned as illusion. It is a unique and triumphant work of fiction - at once romantic, erotic, suspenseful - and completely unforgettable.",
        bookImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409595968i/929.jpg'
    },
    {
        author: "Antoine de Saint-Exupéry",
        title: "The Little Prince",
        ISBN: 9788854172388,
        summary: "A pilot stranded in the desert awakes one morning to see, standing before him, the most extraordinary little fellow. 'Please,' asks the stranger, 'draw me a sheep.' And the pilot realizes that when life's events are too difficult to understand, there is no choice but to succumb to their mysteries. He pulls out pencil and paper... And thus begins this wise and enchanting fable that, in teaching the secret of what is really important in life, has changed forever the world for its readers.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1367545443i/157993.jpg"
    },
    {
        author: "Victor Hugo",
        title: 'Les Misérables',
        ISBN: 9780375403170,
        summary: "It has been said that Victor Hugo has a street named after him in virtually every town in France. A major reason for the singular celebrity of this most popular and versatile of the great French writers is Les Misérables (1862). In this story of the trials of the peasant Jean Valjean—a man unjustly imprisoned, baffled by destiny, and hounded by his nemesis, the magnificently realized, ambiguously malevolent police detective Javert—Hugo achieves the sort of rare imaginative resonance that allows a work of art to transcend its genre.Les Misérables is at once a tense thriller that contains one of the most compelling chase scenes in all literature, an epic portrayal of the nineteenth-century French citizenry, and a vital drama—highly particularized and poetic in its rendition but universal in its implications—of the redemption of one human being.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388221618i/24284.jpg"
    },
    {
        author: "Fyodor Dostoevsky",
        title: "Crime and Punishment",
        ISBN: 9780143058144,
        summary: "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, a Napoleon: acting for a higher purpose beyond conventional moral law. But as he embarks on a dangerous game of cat and mouse with a suspicious police investigator, Raskolnikov is pursued by the growing voice of his conscience and finds the noose of his own guilt tightening around his neck. Only Sonya, a downtrodden sex worker, can offer the chance of redemption.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382846449i/7144.jpg"
    },
    {
        author: 'William Golding',
        title: "Lord of the Flies",
        ISBN: 9780140283334,
        summary: "At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate; this far from civilization the boys can do anything they want. Anything. They attempt to forge their own society, failing, however, in the face of terror, sin and evil. And as order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far from reality as the hope of being rescued. Labeled a parable, an allegory, a myth, a morality tale, a parody, a political treatise, even a vision of the apocalypse, Lord of the Flies is perhaps our most memorable novel about 'the end of innocence, the darkness of man’s heart.'",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1340919381i/84943.jpg"
    },
    {
        author: "William Shakespeare",
        title: "Romeo and Juliet",
        ISBN: 9783869711423,
        summary: "In Romeo and Juliet, Shakespeare creates a violent world, in which two young people fall in love. It is not simply that their families disapprove; the Montagues and the Capulets are engaged in a blood feud.In this death-filled setting, the movement from love at first sight to the lovers’ final union in death seems almost inevitable. And yet, this play set in an extraordinary world has become the quintessential story of young love. In part because of its exquisite language, it is easy to respond as if it were about all young lovers.",
        bookImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1629680008i/18135.jpg"
    }
]

module.exports = {
    books
}







