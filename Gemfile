# 
# CAMat-Wiki!
# Centro Academico da Matematica, Estatistica e Computacao da Universidade de Sao Paulo
# https://camat.ime.usp.br/
#
source "https://rubygems.org"

# Olar! Aqui eh onde você vai mexer na versao do Jekyll que ta sendo usada.
# Quando quiser usar uma versao diferente, pode so mudar ai embaixo, ai
# roda no prompt o `bundle install` e chama o classico:
#
#     bundle exec jekyll serve
#
# Isso vai atualizar a versao e tal.
# Boa Jekyllada! (kkkkkkk "Jekylling")
gem "jekyll", "~> 4.2.2"

# sem isso nao roda o asciidoc
gem 'haml', '~> 5.1', '>= 5.1.2'

# Se quiser usar o GitHub Pages, remova a gema "jekyll" abaixo e
# descomente a linha abaixo. Para atualizar, rode `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins
# Se tiver plugins, bota aqui
group :jekyll_plugins do
  gem 'jekyll-asciidoc', '~> 2.0.1'
  gem 'jekyll-minifier', '~> 0.1.10'
end

# Windows e JRuby nao includem arquivos de "zoneinfo", entao usamos a gema tzinfo-data
# e bibliotecas associadas.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Melhorador de performance para diretorios assistidos no Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# nao entendi entao nao traduzi c:
# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# precisa disso daqui por algum motivo
gem "webrick", "~> 1.7"
