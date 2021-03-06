var containers = document.getElementsByClassName('terminaljs'),
	socket = io('http://127.0.0.1:3001/pty'), term, stream;
for(var i = 0; i < containers.length; i++) {

	setTimeout(function(i) {
		// setting tabindex makes the element focusable
		containers[i].tabindex = 0;

		// use data-* attributes to configure terminal and child_pty
		term = new Terminal(containers[i].dataset);

		// Create bidirectional stream
		stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});

		// Send stream and options to the server
		ss(socket).emit('new', stream, containers[i].dataset);
		
		if(containers[i].dataset.exec)
			stream.write(containers[i].dataset.exec + "\n");

		// Connect everything up
		stream.pipe(term).dom(containers[i]).pipe(stream);
	}.bind(null, i), i*1000);
}
