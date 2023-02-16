<?php

namespace App\Behat;

use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Doctrine\ORM\EntityManagerInterface;
use Imbo\BehatApiExtension\Context\ApiContext;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelInterface;

use function Symfony\Component\DependencyInjection\Loader\Configurator\env;

class UserContext extends ApiContext implements Context, SnippetAcceptingContext
{
    private static ContainerInterface $container;

    public function __construct(KernelInterface $kernel)
    {
        $kernel->boot();
        self::$container = $kernel->getContainer();
    }

    /**
     * @BeforeScenario
     * @AfterScenario
     */
    public function beforeAndAfter($event)
    {
        /** @var EntityManagerInterface $em */
        $em = self::$container->get('doctrine')->getManager();
        $connection = $em->getConnection();
        $tables = $connection->getSchemaManager()->listTables();
        $query = 'SET FOREIGN_KEY_CHECKS=0; ';

        foreach ($tables as $table) {
            $name = $table->getName();
            $query .= 'TRUNCATE ' . $name . '; ';
        }

        $query .= 'SET FOREIGN_KEY_CHECKS=1;';

        $connection->executeQuery($query, [], []);
    }
}
