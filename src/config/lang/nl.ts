const nl = {
    validation: {
        email: 'Dit is geen validate email adres',
        required: 'Dit veld is verplicht',
        size: {
            min: 'Dit veld moet minimaal {0} tekens lang zijn',
            max: 'Dit veld mag maximaal {0} tekens lang zijn',
        },
        containsNumber: '{0} moet een nummer bevatten',
        containsUppercaseChar: '{0} moet een hoofdletter bevatten!',
    },
    changeLocale: 'Verander taal',
    save: 'Opslaan',
    clearForm: 'Reset formulier',
    male: 'Man',
    female: 'Vrouw',
    gender: 'Geslacht',
    users: 'Gebruikers',
    newUser: 'Nieuwe gebruiker',
    password: 'Wachtwoord',
    username: 'Gebruikersnaam',
    searchResults: 'Zoekresultaten',
    noResultsFor: 'Geen zoekresultaten voor:',
    noFiltersSelected: 'Geen filters geselecteerd.',
    orderOfTasks: 'Volgorde van<br />beroepstaken:',

    // Site
    pages: {
        home: {
            heroText: 'De HBO-i domeinbeschrijving is het landelijk kader voor de eindkwalificaties op associate degree-, bachelor- en professional masterniveau voor afgestudeerden van Nederlandse hbo-opleidingen in het ict-domein. De domeinbeschrijving wordt onderhouden door de Stichting HBO-i. <br><br>Bekijk hier de online-editie van de HBO-i domeinbeschrijving 2023 of download de complete editie in PDF-formaat.'
        },
        schools: {
            heroTitle: 'Aangesloten hogescholen bij <br>HBO-i',
            heroText: 'De Stichting HBO-i is de koepelorganisatie van ict-opleidingen op hbo-niveau in Nederland. De stichting zet zich in voor kennisuitwisseling en informatieoverdracht op vakinhoudelijk en onderwijskundig gebied. Door gezamenlijke activiteiten en producten te ontwikkelen spant de stichting zich tevens in om de instroom van studenten te verhogen. Een van de producten van het HBO-i is deze domeinbeschrijving.'
        }
    },

    filter: {
        welcomeToFilter: 'Welkom bij het HBO-i Filter!',
        welcomeText: 'Je kunt hier bepalen (filteren) voor welke architectuurlagen en/of activiteiten en/of beheersingsniveaus je de beroepstaken wilt zien. Daarnaast kun je volgorde bepalen waarin de beroepstaken getoond worden. Hopelijk vind je snel de gewenste informatie: succes en filteren maar!',
        filterOnDimensions: 'Filter op dimensies',

        title: 'Filter instellen voor:',

        backToFilter: 'HBO-i Filter',
        goToActivities: 'Activiteiten',
        configure: 'Filter instellen',

        architectureHint: `
            De 5 architectuurlagen geven aan binnen welke context een ict-er aan het werk is:
            <ul>
                <li>Gebruikersinteractie: communicatie tussen (eind)gebruiker en ict-systeem.</li>
                <li>Organisatieprocessen: faciliteren van organisatieprocessen door middel van ict-systemen.</li>
                <li>Infrastructuur: het geheel aan ict-systemen waarmee organisatieprocessen gefaciliteerd worden.</li>
                <li>Software: het ontwikkelen van diverse soorten software die opgenomen kan worden in de ict-infrastructuur.</li>
                <li>Hardware interfacing: software die interactie aangaat met beschikbare hardware.</li>
            </ul>
        `,

        activitiesHint: `
            De 5 activiteiten zijn gebaseerd op de ‘system en software development life cycle’:
            <ul>
                <li>Analyseren van processen, producten en informatiestromen in hun onderlinge samenhang en context</li>
                <li>Adviseren over de inrichting van processen en/of informatie voor een nieuw te ontwikkelen, aan te schaffen of aan te passen ict-systeem</li>
                <li>Ontwerpen van een (deel van een) ict-systeem op basis van requirements</li>
                <li>Realiseren en testen van een (deel van een) ict-systeem op basis van een ontwerp</li>
                <li>Manage & control & optimaliseren van de ontwikkeling, de ingebruikname en het gebruik van ict-systemen</li>
            </ul>
        `,

        levelsHint: `
            Het beheersingsniveau wordt bepaald door de complexiteit van de context, de complexiteit van de inhoud en de zelfstandigheid bij de uitvoering van een beroepstaak.
            <br />
            <br />
            Om binnen de diversiteit vergelijkbaarheid mogelijk te maken onderscheiden we vier beheersingsniveaus, conform de definities in het Zelcommodel.
        `,

        orderTooltip: 'Door te slepen met de 3 zwarte knoppen bepaal je de volgorde waarin de gevonden beroepstaken getoond worden.'
    },

    searchInDomainDescription: 'Zoeken in domeinbeschrijving',

    aboutUs: 'Over ons',
    hboIMembers: 'HBO-i Leden',
    export: 'Export',
    contact: 'Contact',

    allOn: 'Alles aan',
    allOff: 'Alles uit',

    schools: 'Scholen',

    domainDescription: 'Domeinbeschrijving',
    professionTasks: 'Beroepstaken',
    professionalSkills: 'Professional Skills',

    architectureLayers: 'Architectuurlagen',
    activities: 'Activiteiten',
    courseLevels: 'Beheerniveau\s',

    level: 'Niveau {0}',

    setOrder: 'Volgorde instellen',

    filterAgain: 'Filter opnieuw',
    openFilter: 'Open de HBO-i filter',

    // Footer
    contactInfo: 'Contact info'
};

export default nl;
