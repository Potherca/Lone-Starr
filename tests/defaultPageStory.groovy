using "geb"

scenario "index page", {

    when "we open the index page", {
        go "http://todo.potherca.local:5984"
    }
    then "jquery runs, and changes text to trailhead", {

        $('div.huge').text().shouldBe "Trailhead"
    }
}


scenario "print all documents", {
	when "We are on the default page", {
		go "http://todo.potherca.local:5984"
	}
	then "there is list of all document ids", {
		$('li').size().shouldBeGreaterThan 0
	}
}