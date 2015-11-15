sudo update-alternatives --install /usr/bin/ruby ruby /usr/bin/ruby2.2 400 \
 --slave /usr/bin/rake rake /usr/bin/rake2.2 \
 --slave /usr/bin/ri ri /usr/bin/ri2.2 \
 --slave /usr/bin/rdoc rdoc /usr/bin/rdoc2.2 \
 --slave /usr/bin/gem gem /usr/bin/gem2.2 \
 --slave /usr/bin/irb irb /usr/bin/irb2.2
