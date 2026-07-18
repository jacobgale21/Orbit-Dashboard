HARDCODED_MISSIONS = [
    {
        "external_id": "e3df2ecd-c239-472f-95e4-2b89b4f75800",
        "name": "Sputnik 1",
        "slug": "sputnik-8k74ps-sputnik-1",
        "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/sputnik_8k74ps_image_20210830185541.jpg",
        "thumbnail_url": None,  # paste was corrupted
        "image_credit": None,
        "image_license": "Unknown",
        "status": "Launch Successful",
        "launch_date": "1957-10-04T19:28:34Z",
        "description": (
            "First artificial satellite consisting of a 58 cm pressurized aluminium "
            "shell containing two 1 W transmitters for a total mass of 83.6 kg."
        ),
        "agency": "Soviet Space Program",
        "rocket": "Sputnik 8K74PS",
        "destination": "Earth",
        "launch_site": "Baikonur Cosmodrome, Republic of Kazakhstan",
        "search_query": "Sputnik 1",
    },
    
    {
        # WARNING: search=Voyager+1 returned Voyager 2 as first hit
        "external_id": "75414835-ec0a-43f4-b624-1636502312f3",
        "name": "Voyager 2",
        "slug": "titan-iiie-voyager-2",
        "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/titan%20iii_image_20190222030055.jpeg",
        "thumbnail_url": None,
        "image_credit": None,
        "image_license": "Unknown",
        "status": "Launch Successful",
        "launch_date": "1977-08-20T14:29:44Z",
        "description": (
            "Voyager 2 is a space probe launched by NASA on August 20, 1977, "
            "to study the outer planets. Part of the Voyager program, it was "
            "launched 16 days before its twin, Voyager 1, on a trajectory that "
            "took longer to reach Jupiter and Saturn but enabled further "
            "encounters with Uranus and Neptune. It is the only spacecraft to "
            "have visited either of the ice giants."
        ),
        "agency": "Lockheed Martin",
        "rocket": "Titan IIIE",
        "destination": "Earth",  # orbit celestial_body at launch
        "launch_site": "Cape Canaveral SFS, FL, USA",
        "search_query": "Voyager 1",  # mismatched / also used for Voyager 2
    },
    {
        # Cassini: mission was null in API — use launch name / manual description
        "external_id": "16e4908a-564a-4019-89a9-0d64ee4caaaa",
        "name": "Cassini-Huygens",
        "slug": "titan-ivbcentaur-cassini-huygens",
        "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/titan%20ivb_image_20190222030244.jpeg",
        "thumbnail_url": None,
        "image_credit": None,
        "image_license": "Unknown",
        "status": "Launch Successful",
        "launch_date": "1997-10-15T08:43:01Z",
        "description": None,  # API had "mission": null
        "agency": "Lockheed Martin",
        "rocket": "Titan IVB/Centaur",
        "destination": None,
        "launch_site": "Cape Canaveral SFS, FL, USA",
        "search_query": "Cassini",
    },
]