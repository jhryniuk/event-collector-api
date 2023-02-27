<?php

namespace App\Behat;

use App\Entity\User;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;
use Doctrine\ORM\EntityManagerInterface;
use Imbo\BehatApiExtension\Context\ApiContext;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

abstract class AbstractContext extends ApiContext implements Context
{
    protected ContainerInterface $container;
    protected UserPasswordHasherInterface $hasher;

    public function __construct(KernelInterface $kernel, UserPasswordHasherInterface $hasher)
    {
        $kernel->boot();
        $this->container = $kernel->getContainer();
        $this->hasher = $hasher;
    }

    /**
     * @Given the following people exists in db:
     */
    public function theFollowingPeopleExistsInDb(TableNode $table)
    {
        /** @var EntityManagerInterface $em */
        $em = $this->container->get('doctrine')->getManager();
        foreach ($table as $row) {
            $user = new User();
            $roles = explode(',', str_replace(['[', ']', ' '], '', $row['roles']));
            $user
                ->setEmail($row['email'])
                ->setPassword($row['password'])
                ->setRoles($roles);
            $password = $this->hasher->hashPassword($user, $user->getPassword());
            $user->setPassword($password);
            $em->persist($user);
            $em->flush();
        }
    }

    /**
     * @BeforeScenario
     * @AfterScenario
     */
    public function beforeAndAfter($event)
    {
        /** @var EntityManagerInterface $em */
        $em = $this->container->get('doctrine')->getManager();
        $connection = $em->getConnection();
        $tables = $connection->createSchemaManager()->listTables();
        $query = 'SET FOREIGN_KEY_CHECKS=0; ';

        foreach ($tables as $table) {
            $name = $table->getName();
            $query .= 'TRUNCATE ' . $name . '; ';
        }

        $query .= 'SET FOREIGN_KEY_CHECKS=1;';

        $connection->executeQuery($query, [], []);
    }
}
