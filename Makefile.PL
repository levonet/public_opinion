use strict;
use warnings;

use ExtUtils::MakeMaker;

WriteMakefile(
  VERSION   => '0.01',
  PREREQ_PM => {
    'Mojolicious' => '5.42',
    'Mojolicious::Plugin::Web::Auth' => '0.10'
  },
  test      => {TESTS => 't/*.t'}
);
